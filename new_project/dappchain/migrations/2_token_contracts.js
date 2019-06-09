const { writeFileSync } = require('fs')

const DragonToken = artifacts.require('./dappchain/TransferableDragon')
const Gateway = artifacts.require('./common/gateway/Gateway')

module.exports = function (deployer, _network, accounts) {
  console.log("ACCOUNTS")
  console.log(accounts)
  const [_, user] = accounts
  const validator = accounts[9]

  deployer.deploy(Gateway, [validator], 3, 4).then(async () => {

      const gatewayInstance = await Gateway.deployed()
  
      console.log(`Gateway deployed at address: ${gatewayInstance.address}`)
  
      const dragonTokenContract = await deployer.deploy(DragonToken, gatewayInstance.address)
      const dragonTokenInstance = await DragonToken.deployed()
  
      console.log(`DragonToken deployed at address: ${dragonTokenInstance.address}`)
      console.log(`DragonToken transaction at hash: ${dragonTokenContract.transactionHash}`)
  
      writeFileSync('./gateway_address', gatewayInstance.address)
      writeFileSync('./dragon_token_address', dragonTokenInstance.address)
      writeFileSync('./dragon_token_tx_hash', dragonTokenContract.transactionHash)
  })
}