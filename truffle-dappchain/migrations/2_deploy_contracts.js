const DragonETC721 = artifacts.require("../contracts/dappchain/TransferableDragon.sol");
const DragonCoin = artifacts.require("../contracts/common/DragonGoldERC20.sol");

module.exports = function(deployer) {
    deployer.deploy(DragonCoin);
    deployer.deploy(DragonETC721);
};