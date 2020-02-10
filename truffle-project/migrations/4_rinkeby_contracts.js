const { writeFileSync } = require('fs')

const MyRinkebyToken = artifacts.require('./MyRinkebyToken.sol')
const MyRinkebyCoin = artifacts.require('./MyRinkebyCoin.sol')
const DragonToken = artifacts.require('./mainnet/MainnetTransferableDragon.sol')
const DragonCoin = artifacts.require('./mainnet/MainnetDragonCoin.sol')
const Gateway = artifacts.require('./mainnet/gateway/MainnetGateway.sol')



module.exports = function (deployer, network, accounts) {
  if (network !== 'rinkeby' && network !== 'ganache') {
    return
  }

  console.log("Deploying mainnet contracts to " + network + "...")

  const [_, user] = accounts

  const validator = accounts[0]

  console.log("VALIDATOR = " + validator)

  deployer.deploy(Gateway, accounts, 3, 4).then(async () => {
    const gatewayInstance = await Gateway.deployed()

    console.log(`Gateway deployed at address: ${gatewayInstance.address}`)

    const dragonTokenContract = await deployer.deploy(DragonToken, gatewayInstance.address)
    const dragonTokenInstance = await DragonToken.deployed()

    console.log(`DragonToken deployed at address: ${dragonTokenInstance.address}`)
    console.log(`DragonToken transaction at hash: ${dragonTokenContract.transactionHash}`)

    const dragonCoinContract = await deployer.deploy(DragonCoin, gatewayInstance.address)
    const dragonCoinInstance = await DragonCoin.deployed()

    console.log(`DragonCoin deployed at address: ${dragonCoinInstance.address}`)
    console.log(`DragonCoin transaction at hash: ${dragonCoinContract.transactionHash}`)

    // await gatewayInstance.toggleToken(dragonTokenInstance.address, { from: validator })
    // await dragonTokenInstance.register(user)

    // map gateway and contract addresses
    await gatewayInstance.setERC721ContractAddress(dragonTokenInstance.address)

    writeFileSync('../mainnet_gateway_address', gatewayInstance.address)
    writeFileSync('../mainnet_dragon_token_address', dragonTokenInstance.address)
    writeFileSync('../mainnet_dragon_token_tx_hash', dragonTokenContract.transactionHash)
    writeFileSync('../loom_dragon_coin_address', dragonCoinInstance.address)
    writeFileSync('../loom_dragon_coin_tx_hash', dragonCoinContract.transactionHash)

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