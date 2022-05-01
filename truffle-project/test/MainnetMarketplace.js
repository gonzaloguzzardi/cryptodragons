const {expectRevert} = require('@openzeppelin/test-helpers');

const MainnetMarketplace = artifacts.require('MainnetMarketplace');
const MainnetTransferableDragon = artifacts.require('MainnetTransferableDragon');
const GenesLaboratory = artifacts.require('GenesLaboratory');

contract('MainnetMarketplace', (accounts) => {
    const GATEWAY_ADDRESS = '0x1234567890123456789012345678901234567892';
    const DRAGON_DECODER_ADDRESS = '0x1234567890123456789012345678901234567893';
    const BLOCKCHAIN_ID = '1';

    const PRICE = '100';

    let ownerAccount    = accounts[0];
    let nonOwnerAccount = accounts[1];

    let marketplaceContract;
    let tokenContract;

    before(async () => {
        tokenContract = await MainnetTransferableDragon.new(GATEWAY_ADDRESS, DRAGON_DECODER_ADDRESS, BLOCKCHAIN_ID);
        marketplaceContract = await MainnetMarketplace.new();

        const genesLaboratory = await GenesLaboratory.new('0x1234567890123456789012345678901234567890');

        await tokenContract.setGenesLaboratoryAddress(genesLaboratory.address, {
            from: ownerAccount
        });

        await tokenContract.createDragon("test", 0, 0, 0, {
            from: ownerAccount
        });

    });

    beforeEach(async () => {

    });

    it('listToken should revert if marketplace was not approved by owner to transfer token', async () => {
        await expectRevert(marketplaceContract.listToken(tokenContract.address, 0, PRICE, {
            from: nonOwnerAccount
        }), "Not owner nor approved");
    });

    it('listToken should succeed when token is approved to be transfered by marketplace', async () => {
        await tokenContract.approve(marketplaceContract.address, 0, {
            from: ownerAccount
        });

        await marketplaceContract.listToken(tokenContract.address, 0, PRICE, {
            from: ownerAccount
        });
    });

    it('buyListedItem should revert if price is not right', async () => {
        const listingId = 1;
        const price = 50;

        await expectRevert(marketplaceContract.buyListedToken(listingId, {
            from: nonOwnerAccount, value: price
        }), "Please submit the asking price in order to complete the purchase");
    });

    it('buyListedItem should succeed if valid listing id and price is right', async () => {
        const listingId = 1;

        await marketplaceContract.buyListedToken(listingId, {
            from: nonOwnerAccount, value: PRICE
        });
    });
});