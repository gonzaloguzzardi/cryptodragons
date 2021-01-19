const MainnetMarketplace = artifacts.require('MainnetMarketplace');

contract('GenesLaboratory', accounts => {
    let marketplace;
    const DRAGON_TOKEN_ADDRESS = "0x1234567890123456789012345678901234567891"

    beforeEach(async () => {
        marketplace = await MainnetMarketplace.new(DRAGON_TOKEN_ADDRESS);
    });

    it('Should initialize dragonTokenAddress with provided value', async () => {
        assert.equal(marketplace.dragonTokenAddress, DRAGON_TOKEN_ADDRESS);
    });

});