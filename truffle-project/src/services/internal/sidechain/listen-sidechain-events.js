const Web3 = require('web3');
const path = require('path');
const fs = require('fs');

// CONSTANTS
const { NonceTxMiddleware, SignedTxMiddleware, Client, CryptoUtils, LoomProvider } = require('loom-js');
const { CHAIN_ID, WRITE_URL, READ_URL, SidechainDragonContract, SidechainGatewayContract } = require('../../../config');

const { deleteDragonInOracle, insertDragonInOracle } = require('../../oracle-actions');

function listenSideChainEvents() {
	const privateKeyStr = fs.readFileSync(path.join(__dirname, '../../../../misc/', 'loom_private_key'), 'utf-8');
	const privateKey = CryptoUtils.B64ToUint8Array(privateKeyStr);
	const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
	const client = new Client(CHAIN_ID, WRITE_URL, READ_URL);

	client.txMiddleware = [new NonceTxMiddleware(publicKey, client), new SignedTxMiddleware(privateKey)];
	client.on('error', (msg) => {
		console.error('Loom connection error', msg);
	});

	const web3 = new Web3(new LoomProvider(client, privateKey));
	const ABIDragon = SidechainDragonContract.abi;
	const ABIGateway = SidechainGatewayContract.abi;

	if (!SidechainDragonContract.networks) {
		throw Error('Dragons contract not deployed on DAppChain');
	}

	if (!SidechainGatewayContract.networks) {
		throw Error('Sidechain Gateway contract not deployed on DAppChain');
	}

	const sidechainDragonsInstance = new web3.eth.Contract(
		ABIDragon,
		SidechainDragonContract.networks['13654820909954'].address,
	);

	const sidechainGatewayInstance = new web3.eth.Contract(
		ABIGateway,
		SidechainGatewayContract.networks['13654820909954'].address,
	);

	sidechainDragonsInstance.events.allEvents((err, event) => {
		if (err) console.err(err);
		if (event) {
			console.log('sidechainDragonsInstance', 'EVENTO ->', event.event);
			switch (event.event) {
				case 'NewDragon':
				case 'Approval':
				case 'ApprovalForAll':
				case 'OwnershipTransferred':
				case 'Transfer':
				default:
					console.log(JSON.stringify(event.returnValues, null, 2));
					break;
			}
		}
	});

	sidechainGatewayInstance.events.allEvents((err, event) => {
		if (err) console.err(err);
		if (event) {
			console.log('sidechainGatewayInstance', 'Evento de sidechain ->', event.event);
			switch (event.event) {
				case 'SendDragonToMainchainAttempt':
					// TODO:
					insertDragonInOracle(event);
					break;
				case 'DragonSuccessfullyRetrievedInSidechain':
					console.log('BORRANDO ESTE', event.returnValues);
					// TODO:
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
					console.log(JSON.stringify(event.returnValues, null, 2));
					break;
			}
		}
	});
}

module.exports = listenSideChainEvents;
