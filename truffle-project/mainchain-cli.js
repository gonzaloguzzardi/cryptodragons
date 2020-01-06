const Web3 = require('web3')
const program = require('commander')
const fs = require('fs')
const path = require('path')
const WAsync = require('@rimiti/express-async');

const MainchainDragonTokenJson = require('./src/contracts/MainnetTransferableDragon.json')

async function getGanacheTokenContract(web3js) {
  const networkId = await web3js.eth.net.getId()
  return new web3js.eth.Contract(
    MainchainDragonTokenJson.abi,
    MainchainDragonTokenJson.networks[networkId].address
  )
}

function loadGanacheAccount() {
  //const privateKey = fs.readFileSync(path.join(__dirname, './ganache_private_key'), 'utf-8')
  //const ownerAccount = web3js.eth.accounts.privateKeyToAccount(privateKey)
  const web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
  const ownerAccount = fs.readFileSync(path.join(__dirname, './ganache_account'), 'utf-8')
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

program
  .version('0.1.0')
  .parse(process.argv)


// API SERVER
var express = require('express')
var http = require('http')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).send("Welcome to API REST")
})

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
}))

//app.get('/api/dragon/transfer', WAsync.wrapAsync(async function transferFunction(req, res, next) {
  // const { account, web3js, client } = loadLoomAccount(req.query.account)
  // try {
  //   if (req.query.id === undefined) {
  //   }
  //   const data = await transferDragonToGateway(web3js, req.query.gas || 350000, account, req.query.id)

  //   console.log(`\n Token with id ${req.query.id} was successfully transfered to gateway \n`) 
  // } catch (err) {
  //   res.status(400).send(err)
  // } finally {
  //   if (client) {
  //     client.disconnect()
  //   }
  //   res.status(200).send(`Token with id ${req.query.id} was successfully transfered to gateway`)
  // }
//}))

app.get('/api/dragons', WAsync.wrapAsync(async function getDragonFunction(req, res, next) {
  const { account, web3js } = loadGanacheAccount();
  try {
    const data = await getMyDragons(web3js, account, req.query.gas || 350000);
    console.log(`\nAddress ${account} holds dragons with id ${data}\n`);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err)
  }
}))

const PORT = 8002;
http.createServer(app).listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
