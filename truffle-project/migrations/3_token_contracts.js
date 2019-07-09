const { writeFileSync } = require('fs')

const MyToken = artifacts.require('./MyToken.sol')
const MyCoin = artifacts.require('./MyCoin.sol')
const DragonToken = artifacts.require('./dappchain/DappchainTransferableDragon.sol')
const Gateway = artifacts.require('./common/gateway/Gateway.sol')

const gatewayAddress = '0xe754d9518bf4a9c63476891ef9AA7d91C8236A5D'

module.exports = function (deployer, network, accounts) {
  if (network === 'rinkeby') {
    return
  }

  const [_, user] = accounts
  const validator = accounts[9]
  deployer.deploy(Gateway, [validator], 3, 4).then(async () => {
    const gatewayInstance = await Gateway.deployed()

    console.log(`Gateway deployed at address: ${gatewayInstance.address}`)

    const dragonTokenContract = await deployer.deploy(DragonToken, gatewayInstance.address)
    const dragonTokenInstance = await DragonToken.deployed()

    console.log(`DragonToken deployed at address: ${dragonTokenInstance.address}`)
    console.log(`DragonToken transaction at hash: ${dragonTokenContract.transactionHash}`)

    //await gatewayInstance.toggleToken(dragonTokenInstance.address, { from: validator })
    //await dragonTokenInstance.register(user)

    writeFileSync('../loom_gateway_address', gatewayInstance.address)
    writeFileSync('../loom_dragon_token_address', dragonTokenInstance.address)
    writeFileSync('../loom_dragon_token_tx_hash', dragonTokenContract.transactionHash)

    // Example
    await deployer.deploy(MyToken, gatewayAddress)
    const myTokenInstance = await MyToken.deployed()

    await deployer.deploy(MyCoin, gatewayAddress)
    const myCoinInstance = await MyCoin.deployed()
        
    console.log('\n*************************************************************************\n')
    console.log(`MyToken Contract Address: ${myTokenInstance.address}`)
    console.log(`MyCoin Contract Address: ${myCoinInstance.address}`)
    console.log('\n*************************************************************************\n')
  })
}