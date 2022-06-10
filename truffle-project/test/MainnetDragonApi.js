const MainnetMarketplace = artifacts.require('MainnetMarketplace');
const MainnetTransferableDragon = artifacts.require('MainnetTransferableDragon');
const GenesLaboratory = artifacts.require('GenesLaboratory');
const MainnetDragonApi = artifacts.require('MainnetDragonApi');

contract('DragonApi', (accounts) => {
    const INITIAL_DRAGON_AMOUNT = 5;
    const GATEWAY_ADDRESS = '0x1234567890123456789012345678901234567892';
    const DRAGON_DECODER_ADDRESS = '0x1234567890123456789012345678901234567893';
    const BLOCKCHAIN_ID = '1';

    let mainAccount = accounts[0];

    let marketplaceContract;
    let tokenContract;
    let dragonApiContract;

    before(async () => {
        tokenContract = await MainnetTransferableDragon.new(GATEWAY_ADDRESS, DRAGON_DECODER_ADDRESS, BLOCKCHAIN_ID);
        marketplaceContract = await MainnetMarketplace.new();
        const genesLaboratory = await GenesLaboratory.new('0x1234567890123456789012345678901234567890');

        dragonApiContract = await MainnetDragonApi.new(tokenContract.address, genesLaboratory.address, marketplaceContract.address);

        await tokenContract.setGenesLaboratoryAddress(genesLaboratory.address, {
            from: mainAccount
        });

        await initializeTestDragons();
    });


    it('getDragonsByPage should return first and second dragons for first page with size 2', async () => {
        const pageNumber = 1;
        const pageSize = 2;
        await dragonApiContract.getDragonsByPage(pageNumber, pageSize, {
            from: mainAccount
        })
        .then(result => {
            const totalPages = result[0];
            const dragonPageData = result[1];

            assert.equal(3, totalPages);
            assert.equal(2, dragonPageData.length);

            assert.equal(0, dragonPageData[0].dragonId);
            assert.equal(mainAccount, dragonPageData[0].owner);
            assert.equal(false, dragonPageData[0].onSale);

            assert.equal(1, dragonPageData[1].dragonId);
            assert.equal(mainAccount, dragonPageData[1].owner);
            assert.equal(false, dragonPageData[1].onSale);
        });
    });

    it('getDragonsByPage should return third and fourth dragons for second page with size 2', async () => {
        const pageNumber = 2;
        const pageSize = 2;
        await dragonApiContract.getDragonsByPage(pageNumber, pageSize, {
            from: mainAccount
        })
        .then(result => {
            const totalPages = result[0];
            const dragonPageData = result[1];

            assert.equal(3, totalPages);
            assert.equal(2, dragonPageData.length);

            assert.equal(2, dragonPageData[0].dragonId);
            assert.equal(mainAccount, dragonPageData[0].owner);
            assert.equal(false, dragonPageData[0].onSale);

            assert.equal(3, dragonPageData[1].dragonId);
            assert.equal(mainAccount, dragonPageData[1].owner);
            assert.equal(false, dragonPageData[1].onSale);
        });
    });

    
    it('getDragonsByPage should return only fifth dragon for third page with size 2', async () => {
        const pageNumber = 3;
        const pageSize = 2;
        await dragonApiContract.getDragonsByPage(pageNumber, pageSize, {
            from: mainAccount
        })
        .then(result => {
            const totalPages = result[0];
            const dragonPageData = result[1];

            assert.equal(3, totalPages);
            assert.equal(1, dragonPageData.length);

            assert.equal(4, dragonPageData[0].dragonId);
            assert.equal(mainAccount, dragonPageData[0].owner);
            assert.equal(false, dragonPageData[0].onSale);
        });
    });

    async function initializeTestDragons() {
        for (var i = 0; i < INITIAL_DRAGON_AMOUNT; i++) {
            await tokenContract.createDragon("test", 0, 0, 0, {
                from: mainAccount
            });
         }
    }
});