const CHAIN_ID = 'default';
const WRITE_URL = !process.env.DOCKERENV ? 'ws://0.0.0.0:46658/websocket' : 'ws://loom:46658/websocket';
const READ_URL = !process.env.DOCKERENV ? 'ws://0.0.0.0:46658/queryws' : 'ws://loom:46658/queryws';

const BFA_SOCKET_CONNECTION = !process.env.DOCKERENV ? 'ws://0.0.0.0:8546' : 'ws://bfa:8546';
const BFA_NETWORK_ID = '12345';

const oracleApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://oracle';
const oracleApiPort = 8081;

const SidechainDragonContract = require('../contracts/DappchainTransferableDragon');
const SidechainGatewayContract = require('../contracts/DappchainGateway');

const MainChainGateway = require('../contracts/MainnetGateway');
const MainchainDragonContract = require('../contracts/MainnetTransferableDragon');

module.exports = {
	CHAIN_ID,
	WRITE_URL,
	READ_URL,
	BFA_NETWORK_ID,
	BFA_SOCKET_CONNECTION,
	oracleApiUrl,
	oracleApiPort,
	SidechainDragonContract,
	SidechainGatewayContract,
	MainChainGateway,
	MainchainDragonContract,
};
