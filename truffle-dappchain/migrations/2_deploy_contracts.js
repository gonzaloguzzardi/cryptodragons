const DragonETC721 = artifacts.require("../contracts/dappchain/TransferableDragon.sol");
const DragonCoin = artifacts.require("./token/DragonGold.sol");

module.exports = function(deployer) {
    deployer.deploy(DragonCoin);
    deployer.deploy(DragonETC721);
};