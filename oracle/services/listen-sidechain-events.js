const Web3 = require('web3');
const path = require('path');
var fs = require("fs");

// MONGO-DB
const { insertOnMongo, transforEventIntoTransactionObj } = require('../mongo-utils');

// CONSTANTS
const {
	CHAIN_ID, WRITE_URL, READ_URL,
    collection, database, url, SidechainGateway
} = require ('../config');

// LOOM-JS
const {
	NonceTxMiddleware, SignedTxMiddleware, Client,
	CryptoUtils, LoomProvider,
} = require('loom-js');

let sideList = [];

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

module.exports = {
    listenSideChainEvents,
};
