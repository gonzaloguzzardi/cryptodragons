const Web3 = require('web3');
const path = require('path');
const {
	NonceTxMiddleware, SignedTxMiddleware, Client,
	CryptoUtils, LoomProvider,
} = require('loom-js');
const cron = require("node-cron");
var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require("body-parser");
var fs = require("fs");
var request = require('request');

// Constants
const {
	CHAIN_ID, WRITE_URL, READ_URL,
	API_PORT, collection, database, url,
	sidechainApiUrl, sidechainApiPort,
	mainchainApiUrl, mainchainApiPort,
	SidechainGateway, MainChainGateway,
} = require ('./config');

const {
	insertOnMongo, transforEventIntoTransactionObj,
} = require('./mongo-utils');

const {
	getDragonsInSidechainGateway,
} = require('./controllers');

let sideList = [], mainList = [], message = {};

function listenSideChainEvents() {
	var accountPath = './misc/loom_private_key'
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
	const ABI = SidechainGateway.abi;

	if (!SidechainGateway.networks) {
		throw Error('Contract not deployed on DAppChain')
	}

	var sidechainGatewayInstance = new web3.eth.Contract(
		ABI,
		SidechainGateway.networks["13654820909954"].address
	)

	// Listen transfer 2 mainchain events
	sidechainGatewayInstance.events.SendDragonToMainchainAttempt((err, event) => {
		if (err) {
			console.error('Error on event', err);
		} else {
			console.log("[SIDECHAIN]: NewDragon event!!!!!");
			sideList.push(transforEventIntoTransactionObj(event));
			console.log("Dragon agregado a la sidelist que es ejecutada por el cron");
			insertOnMongo(database, url, transforEventIntoTransactionObj(event), collection)
		}
	})
}

function listenMainChainEvents() {
	const web3js = new Web3(new Web3.providers.WebsocketProvider("ws://0.0.0.0:8546"));
	const ownerAccount = fs.readFileSync(path.join(__dirname, 'misc', 'mainchain_account'), 'utf-8')
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
			mainList.push(transforEventIntoTransactionObj(event));
			console.log("Dragon agregado a la sidelist que es ejecutada por el cron");
			insertOnMongo(database, url, transforEventIntoTransactionObj(event), collection)
		}
	})
}

function sendToMain() {
	let i = 0;
	while (sideList.length > 0 && i < 10) {
		message = sideList.shift();
		console.log(`Enviando dragon con id ${message.id} a la mainchain`);
		sendMessageToMain(message);
		i++;
	}
}

function sendToSide() {
	let i = 0;
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
			url: `${mainchainApiUrl}:${mainchainApiPort}/api/dragon/receive`,
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
				console.log(`url: ${mainchainApiUrl}:${mainchainApiPort}/api/dragon/receive`);
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

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API ROUTES
app.get('/api/dragons/sidechain-gateway', getDragonsInSidechainGateway);

// SERVER LISTEN
const server = app.listen(API_PORT, '0.0.0.0', function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port);
});

// CRON
cron.schedule("*/15 * * * * *", () => {
	sendToMain();
	sendToSide();
});

// MAIN
listenSideChainEvents();
listenMainChainEvents();
