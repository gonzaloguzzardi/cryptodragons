const CHAIN_ID = 'default';
const WRITE_URL = 'ws://0.0.0.0:46658/websocket';
const READ_URL = 'ws://0.0.0.0:46658/queryws';

const BFA_SOCKET_CONNECTION = 'ws://0.0.0.0:8546';
const BFA_NETWORK_ID = '12345';

const sidechainApiUrl = 'http://localhost';
const sidechainApiPort = 8001;

const mainchainApiUrl = 'http://localhost';
const mainchainApiPort = 8002;

const oracleApiUrl = 'http://localhost';
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
	sidechainApiUrl,
	sidechainApiPort,
	mainchainApiUrl,
	mainchainApiPort,
	oracleApiUrl,
	oracleApiPort,
	SidechainDragonContract,
	SidechainGatewayContract,
	MainChainGateway,
	MainchainDragonContract,
};
