const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';
const ADMIN_SECRET = '3Frox9vF4lI1LaoK';

const collection = 'transactions';
const fs = require('fs');

const database = 'crypto-dragons';
const mongoUrl = !process.env.DOCKERENV
  ? `mongodb://0.0.0.0:27017/${database}`
  : `mongodb://mongo:27017/${database}`;

const oracleApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://oracle';
const oracleApiPort = 8081;

const CHAIN_ID = 'default';
const WRITE_URL = !process.env.DOCKERENV
  ? 'ws://0.0.0.0:46658/websocket'
  : 'ws://loom:46658/websocket';
const READ_URL = !process.env.DOCKERENV ? 'ws://0.0.0.0:46658/queryws' : 'ws://loom:46658/queryws';
const BFA_CONNECTION = !process.env.DOCKERENV ? 'http://0.0.0.0:8545' : 'http://bfa:8545';
const BFA_SOCKET_CONNECTION = !process.env.DOCKERENV ? 'ws://0.0.0.0:8546' : 'ws://bfa:8546';
const BFA_NETWORK_ID = '12345';

console.log(`Dir name: ${__dirname}`);

const SidechainDragonContract = require('../contracts/DappchainTransferableDragon');
const SidechainGatewayContract = require('../contracts/DappchainGateway');

const MainChainGatewayContract = require('../contracts/MainnetGateway');
const MainchainDragonContract = require('../contracts/MainnetTransferableDragon');

module.exports = {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  ADMIN_SECRET,

  collection,
  database,
  mongoUrl,
  oracleApiUrl,
  oracleApiPort,
  CHAIN_ID,
  BFA_CONNECTION,
  WRITE_URL,
  READ_URL,
  BFA_NETWORK_ID,
  BFA_SOCKET_CONNECTION,
  SidechainDragonContract,
  SidechainGatewayContract,
  MainChainGatewayContract,
  MainchainDragonContract,
};
