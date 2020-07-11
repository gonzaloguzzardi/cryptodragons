const collection = 'transactions';
const database = 'crypto-dragons';
const mongoUrl = !process.env.DOCKERENV ? `mongodb://0.0.0.0:27017/${database}` : `mongodb://mongo:27017/${database}`;

const sidechainApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://sidechain-deploy-and-cli';
const sidechainApiPort = 8001;

const mainchainApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://mainchain-deploy-and-cli';
const mainchainApiPort = 8002;

const oracleApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://oracle';
const oracleApiPort = 8081;

const CHAIN_ID = 'default';
const WRITE_URL = !process.env.DOCKERENV ? 'ws://0.0.0.0:46658/websocket' : 'ws://loom:46658/websocket';
const READ_URL = !process.env.DOCKERENV ? 'ws://0.0.0.0:46658/queryws' : 'ws://loom:46658/queryws';

const BFA_SOCKET_CONNECTION = !process.env.DOCKERENV ? 'ws://0.0.0.0:8546' : 'ws://bfa:8546';
const BFA_NETWORK_ID = '12345';

const SidechainDragonContract = require('../../truffle-project/src/contracts/DappchainTransferableDragon');
const SidechainGatewayContract = require('../../truffle-project/src/contracts/DappchainGateway');

const MainChainGateway = require('../../truffle-project/src/contracts/MainnetGateway');
const MainchainDragonContract = require('../../truffle-project/src/contracts/MainnetTransferableDragon');

module.exports = {
	collection,
	database,
	mongoUrl,
	sidechainApiUrl,
	sidechainApiPort,
	mainchainApiUrl,
	mainchainApiPort,
	oracleApiUrl,
	oracleApiPort,
	CHAIN_ID,
	WRITE_URL,
	READ_URL,
	BFA_NETWORK_ID,
	BFA_SOCKET_CONNECTION,
	SidechainDragonContract,
	SidechainGatewayContract,
	MainChainGateway,
	MainchainDragonContract,
};
