const WAsync = require('@rimiti/express-async');

const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const {
  Client, NonceTxMiddleware, SignedTxMiddleware,
  LocalAddress, CryptoUtils, LoomProvider,
} = require('loom-js');

const DappchainDragonTokenJson = require('./src/contracts/DappchainTransferableDragon.json');

const dirPath = "../loom_test_accounts";

const loomChainId = '13654820909954'; // TODO ver si cambia o si es siempre el mismo

async function getLoomTokenContract(web3js) {
  return new web3js.eth.Contract(
    DappchainDragonTokenJson.abi,
    DappchainDragonTokenJson.networks[loomChainId].address,
  )
}

/*function createAccount(accountName) {
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
}*/

function loadLoomAccount(accountName) {
  var accountPath = './misc/loom_private_key';

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
  );
  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey)
  ];
  client.on('error', msg => {
    console.error('Loom connection error', msg)
  });

  return {
    account: LocalAddress.fromPublicKey(publicKey).toString(),
    web3js: new Web3(new LoomProvider(client, privateKey)),
    client
  }
}

async function mapAccount(web3js, ownerAccount, gas, mainAccount) {
  const contract = await getLoomTokenContract(web3js)

  const gasEstimate = await contract.methods
    .mapContractToMainnet(mainAccount)
    .estimateGas({ from: ownerAccount, gas: 0 })

  if (gasEstimate == gas) {
    throw new Error('Not enough enough gas, send more.')
  }
  return contract.methods
    .mapContractToMainnet(mainAccount)
    .send({ from: ownerAccount, gas: gasEstimate })
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

async function receiveDragonFromOracle(web3js, ownerAccount, gas, dragonId, data) {
  const contract = await getLoomTokenContract(web3js)
  const gasEstimate = await contract.methods
    .receiveDragon(ownerAccount, dragonId, data)
    .estimateGas({ from: ownerAccount, gas: 0 });
  if (gasEstimate == gas) {
    console.log("Not enough enough gas, send more.");
    throw new Error('Not enough enough gas, send more.');
  }
  console.log("Succesfully transfered the dragon");
  return await contract.methods
    .receiveDragon(ownerAccount, dragonId, data)
    .send({ from: ownerAccount, gas: gasEstimate });
}

const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send("Welcome to API REST")
});

app.get('/api/dragon/create',  WAsync.wrapAsync(async function createFunction(req, res, next) {
  const { account, web3js, client } = loadLoomAccount(req.query.account);
  var hash = "";
  try {
    const tx = await createDragonToken(web3js, account, req.query.gas || 350000);
    console.log(`Dragon created, owner account:`, account);
    console.log(`tx hash: ${tx.transactionHash}`);
    hash = tx.transactionHash;
    res.status(200).send(hash);
  } catch (err) {
    res.status(400).send(err);
  } finally {
    if (client) client.disconnect();
  }
}));

app.post('/api/dragon/receive', WAsync.wrapAsync(async function transferFunction(req, res, next) {
  const { account, web3js, client } = loadLoomAccount(req.query.account);
  let hash = "";
  console.log("Llega al receive del side-cli.");
  try {
    for (let dragon of req.body) {
      const tx = await receiveDragonFromOracle(web3js, account, req.query.gas || 350000, dragon.uid, dragon['2']);
    }
    console.log("MENSAJE RECIBIDO", req.body);
    console.log(`tx hash: ${tx.transactionHash}`);
    hash = tx.transactionHash;
    res.status(200).send(hash);
  } catch (err) {
    console.log("Auch... error on receive..." + err);
    res.status(500).send(err);
  } finally {
    if (client) client.disconnect();
  }
}));

app.get('/api/dragon/transfer', WAsync.wrapAsync(async function transferFunction(req, res, next) {
  const { account, web3js, client } = loadLoomAccount(req.query.account);
  try {
    const data = await transferDragonToGateway(web3js, req.query.gas || 350000, account, req.query.id);
    console.log(`\n Token with id ${req.query.id} was successfully transfered to gateway \n`);
    res.status(200).send(`Token with id ${req.query.id} was successfully transfered to gateway`);
  } catch (err) {
    res.status(400).send(err);
  } finally {
    if (client) client.disconnect();
  }
}));

app.get('/api/dragons', WAsync.wrapAsync(async function getDragonFunction(req, res, next) {
  const { account, web3js, client } = loadLoomAccount(req.query.account)
  var data = ""
  try {
    data = await getMyDragons(web3js, account, req.query.gas || 350000);
    console.log(`\nAddress ${account} holds dragons with id ${data}\n`);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err)
  } finally {
    if (client) client.disconnect();
  }
}));

app.get('/api/mapAccount', WAsync.wrapAsync(async function getMapFunction(req, res, next) {
  const { account, web3js, client } = loadLoomAccount(req.query.account);
  var data = "";
  try {
    data = await mapAccount(web3js, account, req.query.gas || 350000, req.query.mainAccount);
    console.log(`${data}\n`);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err)
  } finally {
    if (client) client.disconnect();
  }
}));

http.createServer(app).listen(8001, () => {
  console.log('Server started at http://localhost:8001');
});
