const Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const program = require('commander')
const fs = require('fs')
const path = require('path')
const {
    Client, NonceTxMiddleware, SignedTxMiddleware, Address, LocalAddress, CryptoUtils, LoomProvider,
    Contracts, Web3Signer, soliditySha3
} = require('loom-js')
// TODO: fix this export in loom-js
const { OfflineWeb3Signer } = require('loom-js/dist/solidity-helpers')
const BN = require('bn.js')

const DappchainDragonTokenJson = require('./src/contracts/DappchainTransferableDragon.json')
const DaapchainCoinJson = require('./src/contracts/DappchainDragonCoin.json')
const DaapchainGatewayJson = require('./src/contracts/DappchainGateway.json')

/*const TransferGateway = Contracts.TransferGateway
const AddressMapper = Contracts.AddressMapper
const EthCoin = Contracts.EthCoin*/

const loomChainId = '13654820909954' // TODO ver si cambia o si es siempre el mismo

const coinMultiplier = new BN(10).pow(new BN(18)) // TODO analizar esto

function readLoomGatewayAddress() {
    return fs.readFileSync(path.join(__dirname, '../loom_gateway_address'), 'utf-8')
}

async function getLoomCoinContract(web3js) {
    return new web3js.eth.Contract(
        DaapchainCoinJson.abi,
        DaapchainCoinJson.networks[loomChainId].address,
    )
}

function getGatewayAddress() {
    return DaapchainGatewayJson.networks[loomChainId].address
}

async function getLoomTokenContract(web3js) {
    return new web3js.eth.Contract(
        DappchainDragonTokenJson.abi,
        DappchainDragonTokenJson.networks[loomChainId].address,
    )
}

async function getLoomGatewayContract(web3js) {
    return new web3js.eth.Contract(
        DaapchainGatewayJson.abi,
        DaapchainGatewayJson.networks[loomChainId].address,
    )
}

async function getLoomCoinBalance(web3js, accountAddress) {
    const contract = await getLoomCoinContract(web3js)
    const addr = accountAddress.toLowerCase()
    const balance = await contract.methods
      .balanceOf(addr)
      .call({ from: addr })
    return balance
  }

async function getLoomTokenBalance(web3js, accountAddress) {
    const contract = await getLoomTokenContract(web3js)
    const addr = accountAddress.toLowerCase()
    const total = await contract.methods
    .balanceOf(addr)
    .call({ from: addr })
    const tokensIds = await contract.methods
        .tokensIdsOwnedBy(addr)
        .call({ from: addr })
    return { total, tokensIds }
}

  function loadLoomAccount() {
    const privateKeyStr = fs.readFileSync(path.join(__dirname, './loom_private_key'), 'utf-8')
    const privateKey = CryptoUtils.B64ToUint8Array(privateKeyStr)
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
    const client = new Client(
      loomChainId,
      'ws://127.0.0.1:46658/websocket',
      'ws://127.0.0.1:46658/queryws'
    )
    client.txMiddleware = [
      new NonceTxMiddleware(publicKey, client),
      new SignedTxMiddleware(privateKey)
    ]
    client.on('error', msg => {
      console.error('Loom connection error', msg)
    })
  
    return {
      account: LocalAddress.fromPublicKey(publicKey).toString(),
      web3js: new Web3(new LoomProvider(client, privateKey)),
      client
    }
  }

async function createDragonToken(web3js, ownerAccount, gas) {
    const contract = await getLoomTokenContract(web3js)
  // createDragon(string memory _name, uint64 _creationTime, uint32 _dadId, uint32 _motherId)
    const gasEstimate = await contract.methods
      .createDragon("test dragon", 1, 2, 2)
      .estimateGas({ from: ownerAccount, gas })
  
    if (gasEstimate == gas) {
      throw new Error('Not enough enough gas, send more.')
    }
  
    return contract.methods
      .createDragon("test dragon", 1, 2, 2)
      .send({ from: ownerAccount, gas: gasEstimate })
  }

program
  .command('create-dragon')
  .description('Create test dragon')
  .option("-g, --gas <number>", "Gas for the tx")
  .action(async function(options) {
    const { account, web3js, client } = loadLoomAccount()
    const loomAccAddress = Address.fromString(`${client.chainId}:${account.toLowerCase()}`)
    console.log("account = " + loomAccAddress)
    try {
      const tx = await createDragonToken(
        web3js, loomAccAddress, 350000
      )
      console.log(`Dragon created`)
      console.log(`tx hash: ${tx.transactionHash}`)
    } catch (err) {
      console.error(err)
    }
  })

program
  .command('deposit-coin <amount>')
  .description('deposit the specified amount of ERC20 tokens into the Transfer Gateway')
  .option("-g, --gas <number>", "Gas for the tx")
  .action(async function(amount, options) {
    const { account, web3js } = loadLoomAccount()
    try {
      const actualAmount = new BN(amount).mul(coinMultiplier)
      const tx = await depositCoinToRinkebyGateway(
        web3js, actualAmount, account.address, options.gas || 350000
      )
      console.log(`${amount} tokens deposited to Ethereum Gateway.`)
      console.log(`Rinkeby tx hash: ${tx.transactionHash}`)
    } catch (err) {
      console.error(err)
    }
  })

program
  .command('test')
  .description('deposit the specified amount of ERC20 tokens into the Transfer Gateway')
  .action(async function() {
    const { account, web3js, client } = loadLoomAccount()
    console.log("address = " + getLoomCoinContract(web3js))
  })

program
  .version('0.1.0')
  .parse(process.argv)