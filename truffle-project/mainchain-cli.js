const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const WAsync = require('@rimiti/express-async');

const MainchainDragonTokenJson = require('./src/contracts/MainnetTransferableDragon.json')
const GatewayJson = require('./src/contracts/MainnetGateway.json');

async function mapAccount(web3js, ownerAccount, gas, sideAccount) {
  const contract = await getLoomTokenContract(web3js)

  const gasEstimate = await contract.methods
  .mapContractToSidechain(sideAccount)
  .estimateGas({ from: ownerAccount, gas: 0 })

  if (gasEstimate == gas) {
    throw new Error('Not enough enough gas, send more.')
  }
  return contract.methods
  .mapContractToSidechain(sideAccount)
  .send({ from: ownerAccount, gas: gasEstimate })
}

async function getGanacheTokenContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  return new web3js.eth.Contract(
    MainchainDragonTokenJson.abi,
    MainchainDragonTokenJson.networks[networkId].address
  )
}

async function getGanacheGatewayContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  return new web3js.eth.Contract(
    GatewayJson.abi,
    GatewayJson.networks[networkId].address
  )
}


function loadGanacheAccount() {
  //const privateKey = fs.readFileSync(path.join(__dirname, './ganache_private_key'), 'utf-8')
  //const ownerAccount = web3js.eth.accounts.privateKeyToAccount(privateKey)
  const web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
  const ownerAccount = fs.readFileSync(path.join(__dirname, './misc/mainchain_account'), 'utf-8')
  web3js.eth.accounts.wallet.add(ownerAccount)
  return { account: ownerAccount, web3js }
}

async function createDragonToken(web3js, ownerAccount, gas) {
  const contract = await getGanacheTokenContract(web3js);
  
  const gasEstimate = await contract.methods
    .createDragon("test dragon", 1, 2, 2)
    .estimateGas({ from: ownerAccount, gas })
  
  if (gasEstimate == gas) {
    throw new Error('Not enough enough gas, send more.')
  }
  
  return contract.methods
    .createDragon("test dragon", 1, 2, 2)
    .send({ from: ownerAccount, gas })
}

async function getMyDragons(web3js, ownerAccount, gas) {
  const contract = await getGanacheTokenContract(web3js)
  return await contract.methods
    .getDragonsIdsByOwner(ownerAccount)
    .call({ from: ownerAccount, gas });
}


async function transferDragonToGateway(web3js, gas, ownerAccount, dragonId) {
  const contract = await getGanacheTokenContract(web3js)
  const gasEstimate = await contract.methods
    .transferToGateway(dragonId)
    .estimateGas({ from: ownerAccount, gas: 0 })
    if (gasEstimate == gas) {
      console.log("Not enough enough gas, send more.");
      throw new Error('Not enough enough gas, send more.')
    }
  console.log("Succesfully transfered the dragon");
  return await contract.methods
    .transferToGateway(dragonId)
    .send({ from: ownerAccount, gas: gasEstimate });
}

async function receiveDragonFromOracle(web3js, ownerAccount, gas, dragonId, data) {
  console.log(data);
  console.log(dragonId);
  const contract = await getGanacheGatewayContract(web3js)
  const gasEstimate = await contract.methods
    .receiveDragon(ownerAccount,dragonId,data)//address mainchainAddress, uint256 uid, bytes memory data
    .estimateGas({ from: ownerAccount, gas: 0 })
    if (gasEstimate == gas) {
      console.log("Not enough enough gas, send more.");
      throw new Error('Not enough enough gas, send more.')
    }
  console.log("Succesfully transfered the dragon");
  return await contract.methods
    .receiveDragon(ownerAccount,dragonId,data)
    .send({ from: ownerAccount, gas: gasEstimate });
}

// API SERVER
const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send("Welcome to API REST")
});

app.get('/api/dragon/create',  WAsync.wrapAsync(async function createFunction(req, res, next) {
  const { account, web3js } = loadGanacheAccount();
  let hash = "";
  try {
    const tx = await createDragonToken(web3js, account, req.query.gas || 350000);
    console.log(`Dragon created`);
    console.log(`tx hash: ${tx.transactionHash}`);
    hash = tx.transactionHash;
    res.status(200).send(hash)
  } catch (err) {
    res.status(500).send(err);
  }
}));

app.post('/api/dragon/receive', WAsync.wrapAsync(async function transferFunction(req, res, next) {
  const { account, web3js } = loadGanacheAccount();
  let hash = "";
  console.log("llega al receive del main...");
  try {
    console.log(req.body);
    for (let dragon of req.body) {
      const tx = await receiveDragonFromOracle(web3js, account, req.query.gas || 350000, dragon.uid, dragon['2']);
    }
    console.log("MENSAJE RECIBIDO", req.body);
    console.log(`tx hash: ${tx.transactionHash}`);
    hash = tx.transactionHash;
    res.status(200).send(hash);
    // console.log(`\n Token with id ${req.query.id} was successfully transfered from gateway \n`);
    // res.status(200).send(`Token with id ${req.query.id} was successfully transfered to gateway`);
  } catch (err) {
    console.log("auch... error on receive..." + err);
    res.status(500).send(err);
  }
}));

app.get('/api/dragon/transfer', WAsync.wrapAsync(async function transferToSideFunction(req, res, next) {
  const { account, web3js } = loadGanacheAccount();
    try {
      const data = await transferDragonToGateway(web3js, req.query.gas || 350000, account, req.query.id, req.query.data)
      console.log(`\n Token with id ${req.query.id} was successfully transfered to gateway \n`) 
    } catch (err) {
      console.log(err);
      res.status(400).send(err)
    }
    res.status(200).send(`Token with id ${req.query.id} was successfully transfered to gateway`)
}));

app.get('/api/dragons', WAsync.wrapAsync(async function getDragonFunction(req, res, next) {
  const { account, web3js } = loadGanacheAccount();
  try {
    const data = await getMyDragons(web3js, account, req.query.gas || 350000);
    console.log(`\nAddress ${account} holds dragons with id ${data}\n`);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
}));

app.get('/api/mapAccount', WAsync.wrapAsync(async function getMapFunction(req, res, next) {
  const { account, web3js, client } = loadLoomAccount(req.query.account)
  var data = ""
  try {
    data = await mapAccount(web3js, account, req.query.gas || 350000, req.query.sideAccount)
    console.log(`${data}\n`) 
  } catch (err) {
    res.status(400).send(err)
  } finally {
    if (client) {
      client.disconnect()
    }
    res.status(200).send(data)
  }
}));

const PORT = 8002;
http.createServer(app).listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
