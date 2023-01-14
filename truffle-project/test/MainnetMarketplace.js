const MainnetMarketplace = artifacts.require('MainnetMarketplace');
const MainnetTransferableDragon = artifacts.require('MainnetTransferableDragon');
const GenesLaboratory = artifacts.require('GenesLaboratory');
const DragonDecoder = artifacts.require('DragonSerializer');
const truffleAssert = require('truffle-assertions');

contract('MainnetMarketplace', (accounts) => {
    const INITIAL_DRAGON_AMOUNT = 5;
    const GATEWAY_ADDRESS = '0x1234567890123456789012345678901234567892';
    const BLOCKCHAIN_ID = '1';

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
            from: mainAccount
        });

        await initializeTestDragons();
    });

    it('listToken should revert if price is 0', async () => {
        const dragonId = 0;
        await marketplaceContract.listToken(tokenContract.address, dragonId, 0, {
            from: dragonOwner
        })
        await truffleAssert.reverts(
            marketplaceContract.listToken(tokenContract.address, dragonId, 0, {
                from: dragonOwner
            }),
            "Price must be at least 1 wei"
        );

    });

    async function initializeTestDragons() {
        for (var i = 0; i < INITIAL_DRAGON_AMOUNT; i++) {
            await tokenContract.createDragon("test", 0, 0, 0, {
                from: dragonOwner
            });
         }
    }
});