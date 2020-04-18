const Web3 = require('web3');
const path = require('path');
var fs = require("fs");

// CONSTANTS
const {
	MainchainDragonContract, MainChainGateway, BFA_SOCKET_CONNECTION, BFA_NETWORK_ID,
} = require ('../../../config');

const {
    deleteDragonInOracle,
    insertDragonInOracle
} = require('../../oracle-actions');

function listenMainChainEvents() {
	const web3js = new Web3(new Web3.providers.WebsocketProvider(BFA_SOCKET_CONNECTION));
	const ownerAccount = fs.readFileSync(path.join(__dirname, '../../../../misc/', 'mainchain_account'), 'utf-8')
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
			console.log("mainchainDragonsInstance", "Evento ->", event.event);
			switch(event.event) {
				case 'NewDragon':
				case 'Approval':
				case 'ApprovalForAll':
				case 'OwnershipTransferred':
				case 'Transfer':
				default:
					console.log("Return values", JSON.stringify(event.returnValues, null, 2));
					break;
			}
		}
	});

	mainChainGatewayInstance.events.allEvents((err, event) => {
		if (err) console.error('Error on event', err);
		if (event) {
			console.log("mainchainGatewayInstance", "Evento ->", event.event);
			switch(event.event) {
				case 'SendDragonToSidechainAttempt':
					insertDragonInOracle(event);
					break;
				case 'DragonSuccessfullyRetrievedInMainchain':
					console.log("BORRANDO ESTE", event.returnValues);
					deleteDragonInOracle(event);
					break;
				case 'AddedValidator':
				case 'ERC20Received':
				case 'ERC721Received':
				case 'ETHReceived':
				case 'OwnershipTransferred':
				case 'RemovedValidator':
				case 'TokenWithdrawn':
				default:
					console.log("Return values", JSON.stringify(event.returnValues, null, 2));
					break;
			}
		}
	});
}

module.exports = listenMainChainEvents;
