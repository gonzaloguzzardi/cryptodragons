const { writeFileSync } = require('fs')

const MyRinkebyToken = artifacts.require('./MyRinkebyToken.sol')
const MyRinkebyCoin = artifacts.require('./MyRinkebyCoin.sol')
const DragonToken = artifacts.require('./mainnet/MainnetTransferableDragon.sol')
const Gateway = artifacts.require('./common/gateway/Gateway.sol')

module.exports = function (deployer, network, accounts) {
  if (network !== 'rinkeby') {
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

    // await gatewayInstance.toggleToken(dragonTokenInstance.address, { from: validator })
    // await dragonTokenInstance.register(user)

    writeFileSync('../mainnet_gateway_address', gatewayInstance.address)
    writeFileSync('../mainnet_dragon_token_address', dragonTokenInstance.address)
    writeFileSync('../mainnet_dragon_token_tx_hash', dragonTokenContract.transactionHash)

    // Example
    await deployer.deploy(MyRinkebyToken)
    const myTokenInstance = await MyRinkebyToken.deployed()

    await deployer.deploy(MyRinkebyCoin)
    const myCoinInstance = await MyRinkebyCoin.deployed()
        
    console.log('\n*************************************************************************\n')
    console.log(`MyRinkebyToken Contract Address: ${myTokenInstance.address}`)
    console.log(`MyRinkebyCoin Contract Address: ${myCoinInstance.address}`)
    console.log('\n*************************************************************************\n')
  })
}