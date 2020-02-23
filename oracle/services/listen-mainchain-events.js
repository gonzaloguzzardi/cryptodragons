const Web3 = require('web3');
const path = require('path');
var fs = require("fs");

// MONGO-DB
const { insertOnMongo, transforEventIntoTransactionObj } = require('../mongo-utils');

// CONSTANTS
const { collection, database, url, MainChainGateway } = require ('../config');

let mainList = [];

function listenMainChainEvents() {
	const web3js = new Web3(new Web3.providers.WebsocketProvider("ws://0.0.0.0:8546"));
	const ownerAccount = fs.readFileSync(path.join(__dirname, '../misc', 'mainchain_account'), 'utf-8')
	web3js.eth.accounts.wallet.add(ownerAccount)
	const networkId = "12345";
	
	const MainChainABI = MainChainGateway.abi;

	if (!MainChainGateway.networks) {
		throw Error('Contract not deployed on Mainchain')
	}

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

module.exports = listenMainChainEvents;
