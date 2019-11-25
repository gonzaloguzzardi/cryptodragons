
const Web3 = require('web3');
const path = require('path')
const BN = require('bn.js');

//const Gateway = require("../truffle-project/src/contracts/DappchainGateway");
const Gateway = require("./dependencies/DappchainGateway");
//const Gateway = require("../truffle-project/src/contracts/DappchainTransferableDragon");

const {
	NonceTxMiddleware, SignedTxMiddleware, Client,
	LocalAddress, CryptoUtils, LoomProvider
} = require('loom-js');

const cron = require("node-cron");
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var request = require('request');
var MongoClient = require('mongodb').MongoClient;

var mainList = new Array();
var sideList = new Array();
var msjStatus = new Array();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var collection = "transactions";
var database = "crypto-dragons";
var url = "mongodb://localhost:27017/" + database;


function _getCurrentNetwork() {
	const networkId = 'default'
	const writeUrl = 'http://127.0.0.1:46658/rpc'
	const readUrl = 'http://127.0.0.1:46658/query'

    //let writeUrl = 'ws://127.0.0.1:46658/websocket'
    //let readUrl = 'ws://127.0.0.1:46658/queryws'
    //let networkId = 'default'
    let client = new Client(networkId, writeUrl, readUrl)


	const web3 = new Web3()
	const chainIdHash = web3.utils.soliditySha3(client.chainId)
	.slice(2) // Removes 0x
	.slice(0, 13) // Produces safe Number less than 9007199254740991
	const chainId =  new BN(chainIdHash).toString()	
	return chainId
}

function _createClient() {
    let privateKey = CryptoUtils.generatePrivateKey()
    let publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
	const networkId = 'default'
	const writeUrl = 'http://127.0.0.1:46658/rpc'
	const readUrl = 'http://127.0.0.1:46658/query'

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

function eventGetter() {
	var accountPath = '../truffle-project/loom_private_key'
    const privateKeyStr = fs.readFileSync(path.join(__dirname, accountPath), 'utf-8')
    const privateKey = CryptoUtils.B64ToUint8Array(privateKeyStr)
	const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
    const client = new Client(
      'default',
      'ws://127.0.0.1:46658/websocket',
	  'ws://127.0.0.1:46658/queryws'
	  //'default',
	  //'http://127.0.0.1:46658/rpc',
	  //'http://127.0.0.1:46658/query'
    )
    client.txMiddleware = [
      new NonceTxMiddleware(publicKey, client),
      new SignedTxMiddleware(privateKey)
    ]
    client.on('error', msg => {
      console.error('Loom connection error', msg)
	})
	
	const web3 = new Web3(new LoomProvider(client, privateKey));
	const ABI = Gateway.abi;

	let currentNetwork = Gateway.networks
	if (!currentNetwork) {
	throw Error('Contract not deployed on DAppChain')
	}

	var gatewayInstance = new web3.eth.Contract(
		ABI,
		currentNetwork["13654820909954"].address
	)

	gatewayInstance.events.SendDragonToMainchainAttempt((err, event) => {
		if (err) 
			log("error");
		else {
			console.log(event);
			transaction = transforEventIntoTransactionObj(event);
			console.log(transaction);
			insertOnMongo(database,url,transaction,collection);
		}
	});
//
	//var event = gatewayInstance.events.allEvents((err, event) => {
	//	if (err) 
	//		//console.error('Error on event', err)
	//		log("error");
	//	else {
	//		console.log("algo hay1!!!!!");
	//		console.log(event);
	//		if (this.onEvent) {
	//			console.log("Entro el evento!!!!");
	//			//console.log(event);
	//			this.onEvent(event)
	//		}
	//	}
	//})
	
}

function insertOnMongo(database,url,transaction,collection) {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db(database);
	  dbo.collection(collection).insertOne(transaction, function(err, res) {
		if (err) throw err;
		console.log("inserted...");
		db.close();
	  });
	});	
	return transaction;
} 

fs.readFile( __dirname + "/" + "config.json", 'utf8', function (err, data) {
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
		msj = insertOnMongo(database,url,msj,collection);
	}
	else{
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
		msj = insertOnMongo(database,url,msj,collection);
	}
	else{
		msj = aMsj;
	}
	msjStatus.push(msj);
	res.sendStatus(200);
});

function insertInMain() {
	i=0;
	while (sideList.length > 0 && i < 10) {
		message = sideList.shift();
		sendMessageToMain(message);
		i++;
	}
} 

function insertInSide() {
	i=0;
	while (mainList.length > 0 && i < 10) {
		message = mainList.shift();
		sendMessageToSide(message);
		i++;
	}
} 

function sendMessageToMain(message) {
	request.post(
		{ 
			headers: {'content-type' : 'application/json'}, 
			url: "http://127.0.0.1:8085/mainNet", 
			body: message,
			json: true
		}, 
		function(error, response, body){
			if (error == null && body.status == 200) {
				console.log("Envio exitoso...");				
			}	
			else{
				console.log("Starting roll back...");
				console.log(body);
				sendMessageToSide(message);
			}

		}
	);	
	console.log("enviando mensaje a la main net");
}

function sendMessageToSide(message) {
	request.post(
		{ 
			headers: {'content-type' : 'application/json'}, 
			url: "http://127.0.0.1:8086/sideNet", 
			body: message,
			json: true
		}, 
		function(error, response, body){
			if (error == null && body.status == 200) {
				console.log("Envio exitoso...");				
			}	
			else{
				console.log("Starting roll back...");
				console.log(body);
				sendMessageToMain(message);
			}
		}
	);	
	console.log("enviando mensaje a la side net");
}

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

cron.schedule("*/5 * * * * *", () => {
	insertInMain();
	insertInSide();
	chekStatus();
});

function chekStatus(){
	for( var i = 0; i < msjStatus.length; i++){ 
		if ( msjFinish(msjStatus[i])) {
			msjStatus.splice(i, 1); 
			i--;
		}
	}
}

function checkSender(msj){
	return null;
}

function msjFinish(msj) {
	console.log(msj + " finish the process...");
	return true;
}

function transforEventIntoTransactionObj(event) {
	console.log(event);
	var transaction = new Object();
	transaction.id = event.returnValues.uid;
	transaction.data = event.raw.data;
	transaction.to = event.returnValues.toMainchainAddress;
	transaction.from = event.returnValues.from;
	transaction.type = event.event;
	return transaction
}

eventGetter();
