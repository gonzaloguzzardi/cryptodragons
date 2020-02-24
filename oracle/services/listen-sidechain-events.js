const Web3 = require('web3');
const path = require('path');
const fs = require("fs");

// MONGO-DB
// const { insertOnMongo, transforEventIntoTransactionObj } = require('../mongo-utils');

// CONSTANTS
const {
	CHAIN_ID, WRITE_URL, READ_URL,
	// collection, database, url,
	SidechainDragonContract, SidechainGatewayContract,
} = require ('../config');

// LOOM-JS
const {
	NonceTxMiddleware, SignedTxMiddleware, Client,
	CryptoUtils, LoomProvider,
} = require('loom-js');

function listenSideChainEvents() {
	const privateKeyStr = fs.readFileSync(path.join(__dirname, '../misc', 'loom_private_key'), 'utf-8')
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
	const ABIDragon = SidechainDragonContract.abi;
	const ABIGateway = SidechainGatewayContract.abi;

	if (!SidechainDragonContract.networks) {
		throw Error('Dragons contract not deployed on DAppChain')
	}

	if (!SidechainGatewayContract.networks) {
		throw Error('Sidechain Gateway contract not deployed on DAppChain')
	}

	const sidechainDragonsInstance = new web3.eth.Contract(
		ABIDragon,
		SidechainDragonContract.networks["13654820909954"].address
	)
	const sidechainGatewayInstance = new web3.eth.Contract(
		ABIGateway,
		SidechainGatewayContract.networks["13654820909954"].address
	)

	sidechainDragonsInstance.events.allEvents((err, event) => {
		if (err) console.err(err);
		if (event) {
			switch(event.event) {
				case 'NewDragon':
					console.log("sidechainDragonsInstance", "EVENTO NewDragon!!!!", event);
					break;
				case 'Approval':
				case 'ApprovalForAll':
				case 'OwnershipTransferred':
				case 'Transfer':
				default:
					// console.log("sidechainDragonsInstance", "OTRO EVENTO ->", event.event);
					break;
			}
		}
	});

	sidechainGatewayInstance.events.allEvents((err, event) => {
		if (err) console.err(err);
		if (event) {
			switch(event.event) {
				case 'SendDragonToMainchainAttempt':
					console.log("sidechainGatewayInstance", "Evento SendDragonToMainchainAttempt!!!!", event);
					break;
				case 'AddedValidator':
				case 'DragonSuccessfullyRetrievedInSidechain':
				case 'ERC20Received':
				case 'ERC721Received':
				case 'ETHReceived':
				case 'OwnershipTransferred':
				case 'RemovedValidator':
				case 'TokenWithdrawn':
				default:
					// console.log("sidechainGatewayInstance", "Evento de sidechain ->", event.event);
					break;
			}
		}
	});
}

module.exports = listenSideChainEvents;
