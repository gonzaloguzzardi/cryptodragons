
const Web3 = require('web3');
// import { Gateway } from "../truffle-project/src/Gateway.json";
// import { Gateway } from "../truffle-project/src/Gateway.json";
const BN = require('bn.js');
const Gateway = require("../truffle-project/src/Gateway");
const {
	Client, LocalAddress, CryptoUtils, LoomProvider
  } = require('loom-js')
  

const cron = require("node-cron");
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var request = require('request');
var MongoClient = require('mongodb').MongoClient;
const web3 = new Web3();
const ABI = Gateway.abi;
    

var mainList = new Array();
var sideList = new Array();
var msjStatus = new Array();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var user = { name: "origin" };
var collection = "users";
var database = "crypto-dragons";
var url = "mongodb://localhost:27017/" + database;


const networkId = _getCurrentNetwork()
//let currentNetwork = Gateway.networks[networkId]

let currentNetwork = Gateway.networks
//console.log(Gateway.networks);
if (!currentNetwork) {
  throw Error('Contract not deployed on DAppChain')
}
function _getCurrentNetwork() {
    let writeUrl = 'ws://127.0.0.1:46658/websocket'
    let readUrl = 'ws://127.0.0.1:46658/queryws'
    let networkId = 'default'
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
    let writeUrl = 'ws://127.0.0.1:46658/websocket'
    let readUrl = 'ws://127.0.0.1:46658/queryws'
    let networkId = 'default'

    let client = new Client(networkId, writeUrl, readUrl)

    client.on('error', msg => {
      console.error('Error on connect to client', msg)
      console.warn('Please verify if loom command is running')
	})
	
	return LocalAddress.fromPublicKey(publicKey).toString();
}

let currentUserAddress = _createClient();
 
var gatewayInstance = new web3.eth.Contract(ABI, currentNetwork.address, {
	from: currentUserAddress
})

console.log(gatewayInstance.events);
  //events: 
  
  //event ETHReceived(address from, uint256 amount);
  //event ERC20Received(address from, uint256 amount, address contractAddress);
  //event ERC721Received(address from, uint256 uid, address contractAddress, bytes data);

gatewayInstance.events.ERC721Received((err, event) => {
	if (err) console.error('Error on event', err)
	else {
		if (this.onEvent) {
			console.log("Entro el evento!!!!");
			console.log(event);
			this.onEvent(event.returnValues)
		}
	}
})		

gatewayInstance.events.ERC20Received((err, event) => {
	if (err) console.error('Error on event', err)
	else {
		if (this.onEvent) {
			console.log("Entro el evento!!!!");
			console.log(event);
			this.onEvent(event.returnValues)
		}
	}
})		

gatewayInstance.events.ETHReceived((err, event) => {
	if (err) console.error('Error on event', err)
	else {
		if (this.onEvent) {
			console.log("Entro el evento!!!!");
			console.log(event);
			this.onEvent(event.returnValues)
		}
	}
})		

function insertOnMongo(database,url,user,collection) {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db(database);
	  dbo.collection(collection).insertOne(myobj, function(err, res) {
		if (err) throw err;
		console.log("inserted...");
		db.close();
	  });
	});	
	return user;
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
	getEvent();
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



