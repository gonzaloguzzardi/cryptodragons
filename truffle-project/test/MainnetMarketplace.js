const {expectRevert} = require('@openzeppelin/test-helpers');

const MainnetMarketplace = artifacts.require('MainnetMarketplace');
const MainnetTransferableDragon = artifacts.require('MainnetTransferableDragon');

contract('MainnetMarketplace', (accounts) => {
    const DRAGON_TOKEN_ADDRESS = '0x1234567890123456789012345678901234567891';

    const GATEWAY_ADDRESS = '0x1234567890123456789012345678901234567892';
    const DRAGON_DECODER_ADDRESS = '0x1234567890123456789012345678901234567893';
    const BLOCKCHAIN_ID = '1';

    const PRICE = '100';

    let ownerAccount    = accounts[0];
    let nonOwnerAccount = accounts[1];

    let marketplaceContract;
    let tokenContract;

    beforeEach(async () => {
        marketplaceContract = await MainnetMarketplace.new(DRAGON_TOKEN_ADDRESS);
        tokenContract = await MainnetTransferableDragon.new(GATEWAY_ADDRESS, DRAGON_DECODER_ADDRESS, BLOCKCHAIN_ID);

        await tokenContract.createDragon("test", 0, 0, 0, {
            from: ownerAccount
        });
    });

    it('listToken should revert if token was not approved by owner', async () => {
        await tryCatch(marketplaceContract.listToken(DRAGON_TOKEN_ADDRESS, 0, PRICE, {
            from: nonOwnerAccount
        }), errTypes.revert);
    });
});