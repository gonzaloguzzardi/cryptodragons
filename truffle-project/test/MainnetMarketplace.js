const MainnetMarketplace = artifacts.require('MainnetMarketplace');
const MainnetTransferableDragon = artifacts.require('MainnetTransferableDragon');
const GenesLaboratory = artifacts.require('GenesLaboratory');
const DragonDecoder = artifacts.require('DragonSerializer');
const truffleAssert = require('truffle-assertions');

contract('MainnetMarketplace', (accounts) => {
	const INITIAL_DRAGON_AMOUNT = 5;
	const GATEWAY_ADDRESS = '0x1234567890123456789012345678901234567892';
	const BLOCKCHAIN_ID = '1';
	const LISTING_ACTIVE = 0;
	const LISTING_SOLD = 1;
	const LISTING_CANCELLED = 2;

	let mainAccount = accounts[0];
	let dragonOwner = accounts[1];

	let marketplaceContract;
	let tokenContract;
	let dragonApiContract;
	let dragonDecoder;

	before(async () => {
		dragonDecoder = await DragonDecoder.new();
		tokenContract = await MainnetTransferableDragon.new(GATEWAY_ADDRESS, dragonDecoder.address, BLOCKCHAIN_ID);
		marketplaceContract = await MainnetMarketplace.new();
		const genesLaboratory = await GenesLaboratory.new('0x1234567890123456789012345678901234567890');

		await tokenContract.setGenesLaboratoryAddress(genesLaboratory.address, {
			from: mainAccount,
		});

		await initializeTestDragons();
	});

	it('listToken should revert when price is 0', async () => {
		const dragonId = 0;
		await truffleAssert.reverts(
			marketplaceContract.listToken(tokenContract.address, dragonId, 0, {
				from: dragonOwner,
			}),
			'Price must be at least 1 wei',
		);
	});

	it('listToken should revert when marketplace was not approved by token owner', async () => {
		const dragonId = 0;
		await truffleAssert.reverts(
			marketplaceContract.listToken(tokenContract.address, dragonId, 500, {
				from: dragonOwner,
			}),
			'Marketplace is not approved to transfer this token',
		);
	});

	it('listToken should create a new listing', async () => {
		const dragonId = 0;
		const price = 500;
		await tokenContract.approve(marketplaceContract.address, dragonId, {
			from: dragonOwner,
		});

		await marketplaceContract
			.isOnSale(dragonId, {
				from: dragonOwner,
			})
			.then((saleData) => {
				assert.equal(false, saleData.onSale);
				assert.equal(0, saleData.price);
			});

		await marketplaceContract.listToken(tokenContract.address, dragonId, price, {
			from: dragonOwner,
		});

		await marketplaceContract
			.getActiveListingsForAddress(dragonOwner, {
				from: mainAccount,
			})
			.then((result) => {
				assert.equal(1, result.length);
				assert.equal(dragonId, result[0].tokenId);
				assert.equal(tokenContract.address, result[0].nftContract);
				assert.equal(price, result[0].price);
				assert.equal(dragonOwner, result[0].seller);
				assert.equal(LISTING_ACTIVE, result[0].status);
			});
	});

	it('isOnSale should return true and price when dragon is listed', async () => {
		const dragonId = 0;
		const price = 500;

		await marketplaceContract
			.isOnSale(dragonId, {
				from: dragonOwner,
			})
			.then((saleData) => {
				assert.equal(true, saleData.onSale);
				assert.equal(price, saleData.price);
			});
	});

	it('buyListedToken should revert when price does not match listed price', async () => {
		const dragonId = 0;

		const listingId = await marketplaceContract.geListingId(dragonId, {
			from: mainAccount,
		});

		await truffleAssert.reverts(
			marketplaceContract.buyListedToken(tokenContract.address, listingId, {
				from: mainAccount,
				value: 200,
			}),
			'Please submit the asking price in order to complete the purchase',
		);
	});

	it('buyListedToken should transfer token ownership after success', async () => {
		const dragonId = 0;

		const listingId = await marketplaceContract.geListingId(dragonId, {
			from: mainAccount,
		});

		await tokenContract
			.ownerOf(dragonId, {
				from: mainAccount,
			})
			.then((owner) => {
				assert.equal(dragonOwner, owner);
			});

		await marketplaceContract.buyListedToken(tokenContract.address, listingId, {
			from: mainAccount,
			value: 500,
		});

		await tokenContract
			.ownerOf(dragonId, {
				from: mainAccount,
			})
			.then((owner) => {
				assert.equal(mainAccount, owner);
			});

		await marketplaceContract
			.getActiveListingsForAddress(dragonOwner, {
				from: mainAccount,
			})
			.then((result) => {
				assert.equal(0, result.length);
			});
	});

	it('isOnSale should return false when dragon is sold', async () => {
		const dragonId = 0;

		await marketplaceContract
			.isOnSale(dragonId, {
				from: dragonOwner,
			})
			.then((saleData) => {
				assert.equal(false, saleData.onSale);
				assert.equal(0, saleData.price);
			});
	});

	it('fetchMarketItems should return only active listings', async () => {
		const dragonId = 1;
		const dragonId2 = 2;

		await tokenContract.approve(marketplaceContract.address, dragonId, {
			from: dragonOwner,
		});

		await marketplaceContract.listToken(tokenContract.address, dragonId, 500, {
			from: dragonOwner,
		});

		await tokenContract.approve(marketplaceContract.address, dragonId2, {
			from: dragonOwner,
		});

		await marketplaceContract.listToken(tokenContract.address, dragonId2, 500, {
			from: dragonOwner,
		});

		await marketplaceContract
			.fetchMarketItems({
				from: mainAccount,
			})
			.then((result) => {
				assert.equal(2, result.length);
				assert.equal(dragonId, result[0].tokenId);
				assert.equal(dragonId2, result[1].tokenId);
			});
	});

	it('cancelListing should revert when caller is not the seller', async () => {
		const dragonId = 2;

		const listingId = await marketplaceContract.geListingId(dragonId, {
			from: dragonOwner,
		});

		await truffleAssert.reverts(
			marketplaceContract.cancelListing(listingId, {
				from: mainAccount,
			}),
			'Only seller can cancel listing',
		);
	});

	it('cancelListing should revert when listing was sold', async () => {
		const soldListingId = 1;

		await truffleAssert.reverts(
			marketplaceContract.cancelListing(soldListingId, {
				from: dragonOwner,
			}),
			'Item not on sale',
		);
	});

	it('cancelListing should remove listed dragon from sale', async () => {
		const dragonId = 2;

		const listingId = await marketplaceContract.geListingId(dragonId, {
			from: dragonOwner,
		});

		await marketplaceContract.cancelListing(listingId, {
			from: dragonOwner,
		});

		await marketplaceContract
			.geListedItem(listingId, {
				from: mainAccount,
			})
			.then((result) => {
				assert.equal(dragonId, result.tokenId);
				assert.equal(dragonOwner, result.seller);
				assert.equal(LISTING_CANCELLED, result.status);
			});
	});

	it('cancelListing should revert when listing is cancelled', async () => {
		const cancelledListingId = 3;

		await truffleAssert.reverts(
			marketplaceContract.cancelListing(cancelledListingId, {
				from: dragonOwner,
			}),
			'Item not on sale',
		);
	});

	async function initializeTestDragons() {
		for (var i = 0; i < INITIAL_DRAGON_AMOUNT; i++) {
			await tokenContract.createDragon('test', 0, 0, 0, {
				from: dragonOwner,
			});
		}
	}
});
