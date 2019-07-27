const DragonETC721 = artifacts.require("../contracts/dappchain/TransferableDragon.sol");
const Gateway = artifacts.require('common/gateway/Gateway')

// module.exports = function(deployer) {
//     deployer.deploy(DragonCoin);
//     deployer.deploy(DragonETC721);
//     deployer.deploy(Gateway);
// };

module.exports = (deployer, _network) => {
    deployer.deploy(DragonETC721);
    deployer.deploy(Gateway, [validator], 3, 4).then(async () => {
        const gatewayInstance = await Gateway.deployed()

        console.log(`Gateway deployed at address: ${gatewayInstance.address}`)

        const dragonTokenContract = await deployer.deploy(DragonETC721, gatewayInstance.address)
        const dragonTokenInstance = await DragonETC721.deployed()

        console.log(`DragonToken deployed at address: ${dragonTokenInstance.address}`)
        console.log(`DragonToken transaction at hash: ${dragonTokenContract.transactionHash}`)


        writeFileSync('../gateway_address', gatewayInstance.address)
        writeFileSync('../dragon_token_address', dragonTokenInstance.address)
        writeFileSync('../dragon_token_tx_hash', dragonTokenContract.transactionHash)
    })
}