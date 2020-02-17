
const Web3 = require('web3');
const path = require('path')
const BN = require('bn.js');

const Gateway = require("./contracts_jsons/DappchainGateway");
//const Gateway = require("./dependencies/DappchainGateway");
//const Gateway = require("./contracts_jsons/DappchainTransferableDragon");
//const Gateway = require("./contracts_jsons/DappchainGateway");
//const Gateway = require("./contracts_jsons/DappchainTransferableDragon");
//const MainChainGateway = require("./contracts_jsons/MainnetTransferableDragon");
const MainChainGateway = require("./contracts_jsons/MainnetGateway");

const CHAIN_ID = "default";
const WRITE_URL = "ws://0.0.0.0:46658/websocket";
const READ_URL = "ws://0.0.0.0:46658/queryws";
const MAIN_CHAIN_URL = "http://0.0.0.0:8545";
const API_PORT = 8081;
const collection = "transactions";
const database = "crypto-dragons";
const url = "mongodb://0.0.0.0:27017/" + database;

const sidechainApiUrl = 'http://localhost';
const sidechainApiPort = 8001;

const mainchainUrl = 'http://localhost';
const mainchainApiPort = 8002;

const oracleUrl = 'http://localhost';
const oracleApiPort = 8081;

const {
	NonceTxMiddleware, SignedTxMiddleware, Client,
	LocalAddress, CryptoUtils, LoomProvider
} = require('loom-js');

const cron = require("node-cron");
var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())

var bodyParser = require("body-parser");
var fs = require("fs");
var request = require('request');
var MongoClient = require('mongodb').MongoClient;

var mainList = new Array();
var sideList = new Array();
var msjStatus = new Array();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function _getCurrentNetwork() {
	const networkId = 'default'
	const writeUrl = 'http://0.0.0.0:46658/rpc'
	const readUrl = 'http://0.0.0.0:46658/query'

	//let writeUrl = 'ws://127.0.0.1:46658/websocket'
	//let readUrl = 'ws://127.0.0.1:46658/queryws'
	//let networkId = 'default'
	let client = new Client(networkId, writeUrl, readUrl)


	const web3 = new Web3()
	const chainIdHash = web3.utils.soliditySha3(client.chainId)
		.slice(2) // Removes 0x
		.slice(0, 13) // Produces safe Number less than 9007199254740991
	const chainId = new BN(chainIdHash).toString()
	return chainId
}

function _createClient() {
	let privateKey = CryptoUtils.generatePrivateKey()
	let publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
	const networkId = 'default'
	const writeUrl = 'http://0.0.0.0:46658/rpc'
	const readUrl = 'http://0.0.0.0:46658/query'

	//let writeUrl = 'ws://127.0.0.1:46658/websocket'
	//let readUrl = 'ws://127.0.0.1:46658/queryws'
	//let networkId = 'default'

	let client = new Client(networkId, writeUrl, readUrl)

	client.on('error', msg => {
		console.error('Error on connect to client', msg)
		console.warn('Please verify if loom command is running')
	})

	return LocalAddress.fromPublicKey(publicKey).toString();
}

function listenSideChainEvents() {
	var accountPath = './loom_private_key'
	const privateKeyStr = fs.readFileSync(path.join(__dirname, accountPath), 'utf-8')
	const privateKey = CryptoUtils.B64ToUint8Array(privateKeyStr)
	const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
	const client = new Client(CHAIN_ID, WRITE_URL, READ_URL)
	client.txMiddleware = [
		new NonceTxMiddleware(publicKey, client),
		new SignedTxMiddleware(privateKey)
	]
	client.on('error', msg => {
		console.error('Loom connection error', msg)
	})

	const web3 = new Web3(new LoomProvider(client, privateKey));
	const ABI = Gateway.abi;

	if (!Gateway.networks) {
		throw Error('Contract not deployed on DAppChain')
	}

	var gatewayInstance = new web3.eth.Contract(
		ABI,
		Gateway.networks["13654820909954"].address
	)

	// Listen transfer 2 mainchain events
	gatewayInstance.events.SendDragonToMainchainAttempt((err, event) => {
		if (err) {
			console.error('Error on event', err);
		} else {
			console.log("[SIDECHAIN]: NewDragon event!!!!!");
			// console.log(event);
			sideList.push(transforEventIntoTransactionObj(event));
			console.log("Dragon agregado a la sidelist que es ejecutada por el cron");
			// insertOnMongo(database, url, transforEventIntoTransactionObj(event), collection)
		}
	})
}

function listenMainChainEvents() {
	const web3js = new Web3(new Web3.providers.WebsocketProvider("ws://0.0.0.0:8546"));
	const ownerAccount = fs.readFileSync(path.join(__dirname, './mainchain_account'), 'utf-8')
	web3js.eth.accounts.wallet.add(ownerAccount)
	const networkId = "12345";
	
	const MainChainABI = MainChainGateway.abi;

	if (!MainChainGateway.networks) {
		throw Error('Contract not deployed on Mainchain')
	}

	console.log(networkId);
	console.log(MainChainGateway.networks);

	var mainChainGatewayInstance = new web3js.eth.Contract(
		MainChainABI,
		MainChainGateway.networks[networkId].address
	)

	mainChainGatewayInstance.events.SendDragonToSidechainAttempt((err, event) => {
		if (err) {
			console.error('Error on event', err);
		} else {
			console.log("[SIDECHAIN]: NewDragon event!!!!!");
			// console.log(event);
			mainList.push(transforEventIntoTransactionObj(event));
			console.log("Dragon agregado a la sidelist que es ejecutada por el cron");
			// insertOnMongo(database, url, transforEventIntoTransactionObj(event), collection)
		}
	})
}

function eventGetter() {
	listenSideChainEvents();
	listenMainChainEvents();
}

function insertOnMongo(database, url, transaction, collection) {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db(database);
		dbo.collection(collection).insertOne(transaction, function (err, res) {
			if (err) throw err;
			console.log("inserted...");
			db.close();
		});
	});
	return transaction;
}

fs.readFile(__dirname + "/" + "config.json", 'utf8', function (err, data) {
	var mainEndpoint = data.mainEndpoint;
	var sideEndpoint = data.sideEndpoint;
	var mainIp = data.mainIp;
	var sideIp = data.sideIp;
	var mainPort = data.mainPort;
	var sidePort = data.sidePort;

	var thisMainEnpoint = data.thisMainEnpoint;
	var thisSideEnpoint = data.thisSideEnpoint;
	var thisIp = data.thisIp;
	var thisPort = data.thisPort;
});

app.post('/addToMainNet', function (req, res) {
	msj = req.body;
	sideList.push(msj);

	msj.status = 0;
	aMsj = checkSender(msj);
	if (aMsj != null) {
		msj = insertOnMongo(database, url, msj, collection);
	}
	else {
		msj = aMsj;
	}
	msjStatus.push(msj);
	res.sendStatus(200);
});

app.post('/addToSideNet', function (req, res) {
	msj = req.body;
	mainList.push(mjs);

	msj.status = 0;
	aMsj = checkSender(msj);
	if (aMsj != null) {
		msj = insertOnMongo(database, url, msj, collection);
	}
	else {
		msj = aMsj;
	}
	msjStatus.push(msj);
	res.sendStatus(200);
});

app.get('/api/dragons', function (req, res) {
	// MongoClient.connect(url, function (err, db) {
	// 	if (err) throw err;
	// 	var dbo = db.db(database);
	// 	dbo.collection(collection).find({}).toArray(
	// 		function (err, result) {
	// 			if (err) throw err;
	// 			res.send(result);
	// 			console.log(result);
	// 			db.close();
	// 		}
	// 	)
	// });
	res.send(sideList);
});

function insertInMain() {
	i = 0;
	while (sideList.length > 0 && i < 10) {
		message = sideList.shift();
		console.log(`Enviando dragon con id ${message.id} a la mainchain`);
		sendMessageToMain(message);
		i++;
	}
}

function insertInSide() {
	i = 0;
	while (mainList.length > 0 && i < 10) {
		message = mainList.shift();
		sendMessageToSide(message);
		i++;
	}
}

function sendMessageToMain(message) {
	request.post(
		{
			headers: { 'content-type': 'application/json' },
			url: `${mainchainUrl}:${mainchainApiPort}/api/dragon/receive`,
			body: message,
			json: true,
		},
		function (error, response, body) {
			if (error) {
				console.log("Starting roll back...");
				console.log(body);
				// sideList.push(message);
				// sendMessageToSide(message);
			} else {
				console.log(`url: ${mainchainUrl}:${mainchainApiPort}/api/dragon/receive`);
				console.log("Envio exitoso...");
			}
		}
	);
	console.log("enviando mensaje a la main chain...");
}

function sendMessageToSide(message) {
	request.post(
		{
			headers: { 'content-type': 'application/json' },
			url: `${sidechainApiUrl}:${sidechainApiPort}/api/dragon/receive`,
			body: message,
			json: true,
		},
		function (error, response, body) {
			if (error) {
				console.log("Starting roll back...");
				console.log(body);
				// sideList.push(message);
				// sendMessageToSide(message);
			} else {
				console.log(`url: ${sidechainApiUrl}:${sidechainApiPort}/api/dragon/receive`);
				console.log("Envio exitoso...");
			}
		}
	);
	console.log("enviando mensaje a la side chain...");
}

var server = app.listen(API_PORT, '0.0.0.0', function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})

cron.schedule("*/5 * * * * *", () => {
	insertInMain();
	insertInSide();
	chekStatus();
});

function chekStatus() {
	for (var i = 0; i < msjStatus.length; i++) {
		if (msjFinish(msjStatus[i])) {
			msjStatus.splice(i, 1);
			i--;
		}
	}
}

function checkSender(msj) {
	return null;
}

function msjFinish(msj) {
	console.log(msj + " finish the process...");
	return true;
}

function transforEventIntoTransactionObj(event) {
	var transaction = new Object();
	transaction.id = event.returnValues.uid;
	transaction.data = event.raw.data;
	transaction.to = event.returnValues.toMainchainAddress;
	transaction.from = event.returnValues.from;
	transaction.type = event.event;
	return transaction
}

eventGetter();
