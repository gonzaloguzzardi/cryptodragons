const WAsync = require('@rimiti/express-async');
const axios = require('axios');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const {
  Client, NonceTxMiddleware, SignedTxMiddleware,
  LocalAddress, CryptoUtils, LoomProvider,
} = require('loom-js');

const DappchainDragonTokenJson = require('./src/contracts/DappchainTransferableDragon.json');
const GatewayJson = require('./src/contracts/DappchainGateway');

const dirPath = "../loom_test_accounts";

const loomChainId = '13654820909954'; // TODO ver si cambia o si es siempre el mismo

async function getLoomTokenContract(web3js) {
  return new web3js.eth.Contract(
    DappchainDragonTokenJson.abi,
    DappchainDragonTokenJson.networks[loomChainId].address,
  )
}

async function getLoomGatewayContract(web3js) {
  return new web3js.eth.Contract(
    GatewayJson.abi,
    GatewayJson.networks[loomChainId].address
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

  console.log("Map account: " + ownerAccount + " with main account: " + mainAccount);

  const gasEstimate = await contract.methods
    .mapContractToMainnet(mainAccount)
    .estimateGas({ from: ownerAccount, gas })

  if (gasEstimate >= gas) {
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

    if (gasEstimate >= gas) {
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

    if (gasEstimate >= gas) {
    throw new Error('Not enough enough gas, send more.')
  }

  return await contract.methods
    .getDragonsIdsByOwner(ownerAccount)
    .call({ from: ownerAccount, gas: gasEstimate });
}

async function getDragonDataById(web3js, ownerAccount, dragonId) {
  const contract = await getLoomTokenContract(web3js);
  const gasEstimate = await contract.methods
  .getDragonById(dragonId)
  .estimateGas({ from: ownerAccount, gas: 0 })

  return await contract.methods
    .getDragonById(dragonId)
    .call({ from: ownerAccount, gasEstimate });
}

async function transferDragonToGateway(web3js, gas, ownerAccount, dragonId) {
  const contract = await getLoomTokenContract(web3js)
  const gasEstimate = await contract.methods
    .transferToGateway(dragonId)
    .estimateGas({ from: ownerAccount, gas: 0 })

    if (gasEstimate >= gas) {
    throw new Error('Not enough enough gas, send more.')
  }

  return await contract.methods
    .transferToGateway(dragonId)
    .send({ from: ownerAccount, gas: gasEstimate });
}

async function receiveDragonFromOracle(web3js, ownerAccount, gas, dragonId, data, receiverAddress) {
  const contract = await getLoomGatewayContract(web3js);

  const gasEstimate = await contract.methods
    .receiveDragon(receiverAddress, dragonId, data)
    .estimateGas({ from: ownerAccount, gas: 0 });
  if (gasEstimate >= gas) {
    console.log("Not enough enough gas, send more.");
    throw new Error('Not enough enough gas, send more.');
  }

  console.log("Transfering dragon with address " + receiverAddress);
  return await contract.methods
    .receiveDragon(receiverAddress, dragonId, data)
    .send({ from: ownerAccount, gas });
}

const express = require('express');
const app = express();
const cors = require('cors');
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
  const { account, web3js, client } = loadLoomAccount();
  let hash = "";
  let tx;
  try {
    for (let dragon of req.body.dragons) {
      console.log("Awaiting receiveDragonFromOracle with dragon " + JSON.stringify(dragon, null, 2));
      const receiverAddress = dragon.toSidechainAddress;
      tx = await receiveDragonFromOracle(web3js, account, req.query.gas || 350000, dragon.uid, dragon.data, receiverAddress);
    }
    console.log(`tx hash: ${tx.transactionHash}`);
    console.log("MENSAJE RECIBIDO", req.body.dragons);
    hash = tx.transactionHash;
    res.status(200).send(hash);
  } catch (err) {
    saveDragonOnOracle(req.body.dragons);
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
/*
    //@TODO para probar. Sacar
    if (Array.isArray(data) && data.length > 0) {
      for (dragonId in data) {
        const dragonData = await getDragonDataById(web3js, account, dragonId);
        console.log("\n Data for dragon with id " + dragonId);
        console.log(JSON.stringify(dragonData, null, 2));
      }
    }
*/
    res.status(200).send(data);
  } catch (err) {
    console.log("Error getting dragons data:" + err);
    res.status(500).send(err)
  } finally {
    if (client) client.disconnect();
  }
}));

app.get('/api/mapAccount', WAsync.wrapAsync(async function getMapFunction(req, res, next) {
  const { account, web3js, client } = loadLoomAccount(req.query.account);
  try {
    await mapAccount(web3js, account, req.query.gas || 350000, req.query.mainAccount);
    res.status(200).send("OK");
  } catch (err) {
    console.log("Error mapping sidechain to mainchain " + err);
    res.status(400).send(err)
  } finally {
    if (client) client.disconnect();
  }
}));

app.get('/api/dragon', WAsync.wrapAsync(async function getMapFunction(req, res, next) { //getDragonDataById(web3js, ownerAccount, dragonId) {
  const { account, web3js, client } = loadLoomAccount(req.query.account);
  try {
    const data = await getDragonDataById(web3js, account, req.query.id);
    data["sname"] = web3js.utils.toUtf8(data.name);
    res.status(200).send(data);
  } catch (err) {
    console.log("Error getting dragon with id: " + req.id);
    res.status(400).send(err)
  } finally {
    if (client) client.disconnect();
  }
}));

const oracleApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://oracle';
const oracleApiPort = 8081;
function saveDragonOnOracle(dragon) {
  axios.get(`${oracleApiUrl}:${oracleApiPort}/api/saveDragon` ,{
    params: { dragon: dragon },
  });
} 

const PORT = 8001;
const server = app.listen(PORT, () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log("Sidechain CLI listening at http://%s:%s", host, port);
});
