const Web3 = require('web3');
const path = require('path');
var fs = require("fs");

// MONGO-DB
const { insertOnMongo, transforEventIntoTransactionObj } = require('../mongo-utils');

// CONSTANTS
const {
	collection, database, mongoUrl, MainchainDragonContract,
	MainChainGateway, BFA_SOCKET_CONNECTION, BFA_NETWORK_ID,
} = require ('../config');

function listenMainChainEvents() {
	const web3js = new Web3(new Web3.providers.WebsocketProvider(BFA_SOCKET_CONNECTION));
	const ownerAccount = fs.readFileSync(path.join(__dirname, '../misc', 'mainchain_account'), 'utf-8')
	web3js.eth.accounts.wallet.add(ownerAccount)
	
	const MainChainABI = MainChainGateway.abi;
	const ABIDragon = MainchainDragonContract.abi;


	if (!MainChainGateway.networks) {
		throw Error('Contract not deployed on Mainchain')
	}

	const mainchainDragonsInstance = new web3js.eth.Contract(
		ABIDragon,
		MainchainDragonContract.networks[BFA_NETWORK_ID].address
	);

	var mainChainGatewayInstance = new web3js.eth.Contract(
		MainChainABI,
		MainChainGateway.networks[BFA_NETWORK_ID].address
	)

	mainchainDragonsInstance.events.allEvents((err, event) => {
		if (err) console.err(err);
		if (event) {
			switch(event.event) {
				case 'NewDragon':
					console.log("mainchainDragonsInstance:", "EVENTO NewDragon");
					break;
				case 'Approval':
				case 'ApprovalForAll':
				case 'OwnershipTransferred':
				case 'Transfer':
				default:
					console.log("mainchainDragonsInstance", "OTRO EVENTO ->", event.event);
					break;
			}
		}
	});

	mainChainGatewayInstance.events.allEvents((err, event) => {
		if (err) console.error('Error on event', err);
		if (event) {
			console.log("LLEGO UN EVENTO");
			switch(event.event) {
				case 'SendDragonToSidechainAttempt':
					console.log("mainchainGatewayInstance:", "EVENTO SendDragonToSidechainAttempt");
					insertOnMongo(database, mongoUrl, transforEventIntoTransactionObj(event), collection)
					break;
				case 'AddedValidator':
				case 'DragonSuccessfullyRetrievedInMainchain':
				case 'ERC20Received':
				case 'ERC721Received':
				case 'ETHReceived':
				case 'OwnershipTransferred':
				case 'RemovedValidator':
				case 'TokenWithdrawn':
				default:
					console.log("mainchainGatewayInstance", "Evento de mainchain ->", event.event);
					break;
			}
		}
	});
}

module.exports = listenMainChainEvents;
