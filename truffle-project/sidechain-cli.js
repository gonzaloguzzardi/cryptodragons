
const WAsync = require('@rimiti/express-async');

const Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const program = require('commander')
const fs = require('fs')

const path = require('path')
const {
    Client, NonceTxMiddleware, SignedTxMiddleware, Address,
    LocalAddress, CryptoUtils, LoomProvider,
    Contracts, Web3Signer, soliditySha3
} = require('loom-js')
// TODO: fix this export in loom-js
const { OfflineWeb3Signer } = require('loom-js/dist/solidity-helpers')
const BN = require('bn.js')

const DappchainDragonTokenJson = require('./src/contracts/DappchainTransferableDragon.json')
const DaapchainCoinJson = require('./src/contracts/DappchainDragonCoin.json')

const dirPath = "../loom_test_accounts"

const loomChainId = '13654820909954' // TODO ver si cambia o si es siempre el mismo

const coinMultiplier = new BN(10).pow(new BN(18)) // TODO analizar esto

async function getLoomCoinContract(web3js) {
    return new web3js.eth.Contract(
        DaapchainCoinJson.abi,
        DaapchainCoinJson.networks[loomChainId].address,
    )
}

async function getLoomTokenContract(web3js) {
    return new web3js.eth.Contract(
        DappchainDragonTokenJson.abi,
        DappchainDragonTokenJson.networks[loomChainId].address,
    )
}

function createAccount(accountName) {
  if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
  }
  const privateKey = CryptoUtils.generatePrivateKey();
  const buffer = new Buffer(privateKey);
  fs.writeFile(`${dirPath}/${accountName}`, buffer.toString('base64'), function(err) {
    if(err) {
        console.log("error creating account " + accountName);
        console.log(err.message)
    } else {
      console.log("Account " + accountName + " created with private key: " + privateKey.toString());
    }
  })
}

function loadLoomAccount(accountName) {
    var accountPath = './loom_private_key'

    if (accountName !== undefined)  {
      const paramFile = `${dirPath}/${accountName}`
      if (fs.existsSync(path.join(__dirname, paramFile))) {
        accountPath = paramFile
      }
    }
    const privateKeyStr = fs.readFileSync(path.join(__dirname, accountPath), 'utf-8')
    const privateKey = CryptoUtils.B64ToUint8Array(privateKeyStr)
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
    const client = new Client(
      'default',
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
      .estimateGas({ from: ownerAccount, gas: 0 })
  
      if (gasEstimate == gas) {
      throw new Error('Not enough enough gas, send more.')
    }
  
    return contract.methods
      .createDragon("test dragon", 1, 2, 2)
      .send({ from: ownerAccount, gas: gasEstimate })
  }

  async function getMyDragons(web3js, ownerAccount, gas) {
    const contract = await getLoomTokenContract(web3js)
    const gasEstimate = await contract.methods
      .getDragonsIdsByOwner(ownerAccount)
      .estimateGas({ from: ownerAccount, gas: 0 })
  
      if (gasEstimate == gas) {
      throw new Error('Not enough enough gas, send more.')
    }
  
    return await contract.methods
      .getDragonsIdsByOwner(ownerAccount)
      .call({ from: ownerAccount, gas: gasEstimate });
  }

  async function transferDragonToGateway(web3js, gas, ownerAccount, dragonId) {
    const contract = await getLoomTokenContract(web3js)
    const gasEstimate = await contract.methods
      .transferToGateway(dragonId)
      .estimateGas({ from: ownerAccount, gas: 0 })
  
      if (gasEstimate == gas) {
      throw new Error('Not enough enough gas, send more.')
    }
  
    return await contract.methods
      .transferToGateway(dragonId)
      .send({ from: ownerAccount, gas: gasEstimate });
  }

program
  .command('create-account <accountName>')
  .description('Create a new loom acount')
  .action(async function(accountName) {
    createAccount(accountName)
  })

program
  .command('create-dragon')
  .description('Create test dragon')
  .option("-g, --gas <number>", "Gas for the tx")
  .option("-a, --account <accountName>", "File countaining private key of the account to use for this transaction")
  .action(async function(options) {
    const { account, web3js, client } = loadLoomAccount(options.account)
    try {
      const tx = await createDragonToken(web3js, account, options.gas || 350000)
      console.log(`Dragon created`)
      console.log(`tx hash: ${tx.transactionHash}`)
    } catch (err) {
      console.error(err)
    } finally {
      if (client) {
        client.disconnect()
      }
    }
  })

  program
  .command('my-dragons')
  .description('Create test dragon')
  .option("-g, --gas <number>", "Gas for the tx")
  .option("-a, --account <accountName>", "File countaining private key of the account to use for this transaction")
  .action(async function(options) {
    console.log("account on the options is:" + options.account)
    const { account, web3js, client } = loadLoomAccount(options.account)
    try {
      const data = await getMyDragons(web3js, account, options.gas || 350000)
      console.log(`\nAddress ${account} holds dragons with id ${data}\n`) 
    } catch (err) {
      console.error(err)
    } finally {
      if (client) {
        client.disconnect()
      }
    }
  })

  program
  .command('transfer-dragon')
  .description('Transfer dragon with token id to the transfer gateway')
  .option("-g, --gas <number>", "Gas for the tx")
  .option("-i, --id <dragonId>", "Dragon id to be transfer to the transfer gateway")
  .action(async function(options) {
    console.log("account on the options is:" + options.account)
    const { account, web3js, client } = loadLoomAccount(options.account)
    try {
      if (options.id === undefined) {
      }
      const data = await transferDragonToGateway(web3js, options.gas || 350000, account, options.id)
      console.log(`\n Token with id ${options.id} was successfully transfered to gateway \n`) 
    } catch (err) {
      console.error(err)
    } finally {
      if (client) {
        client.disconnect()
      }
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
    } finally {
      if (client) {
        client.disconnect()
      }
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


var express = require('express')
var http = require('http')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).send("Welcome to API REST")
})

app.get('/api/dragon/create',  WAsync.wrapAsync(async function createFunction(req, res, next) {
    const { account, web3js, client } = loadLoomAccount(req.query.account)
    var hash = "";
    try {
      const tx = await createDragonToken(web3js, account, req.query.gas || 350000)
      console.log(`Dragon created`)
      console.log(`tx hash: ${tx.transactionHash}`)
      hash = tx.transactionHash
    } catch (err) {
      res.status(400).send(err)
    } finally {
      if (client) {
        client.disconnect()
      }
      res.status(200).send(hash)
    }
}))

app.get('/api/dragon/transfer', WAsync.wrapAsync(async function transferFunction(req, res, next) {
  const { account, web3js, client } = loadLoomAccount(req.query.account)
  try {
    if (req.query.id === undefined) {
    }
    const data = await transferDragonToGateway(web3js, req.query.gas || 350000, account, req.query.id)

    console.log(`\n Token with id ${req.query.id} was successfully transfered to gateway \n`) 
  } catch (err) {
    res.status(400).send(err)
  } finally {
    if (client) {
      client.disconnect()
    }
    res.status(200).send(`Token with id ${req.query.id} was successfully transfered to gateway`)
  }
}))

app.get('/api/dragons', WAsync.wrapAsync(async function getDragonFunction(req, res, next) {
  const { account, web3js, client } = loadLoomAccount(req.query.account)
  var data = ""
  try {
    data = await getMyDragons(web3js, account, req.query.gas || 350000)
    console.log(`\nAddress ${account} holds dragons with id ${data}\n`) 
  } catch (err) {
    res.status(400).send(err)
  } finally {
    if (client) {
      client.disconnect()
    }
    res.status(200).send(data)
  }
}))

http.createServer(app).listen(8001, () => {
  console.log('Server started at http://localhost:8001');
});
  
