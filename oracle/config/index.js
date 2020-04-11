const CHAIN_ID = "default";
const WRITE_URL = !process.env.DOCKERENV ? "ws://0.0.0.0:46658/websocket" : "ws://loom:46658/websocket";
const READ_URL = !process.env.DOCKERENV ? "ws://0.0.0.0:46658/queryws" : "ws://loom:46658/queryws";

const BFA_SOCKET_CONNECTION = !process.env.DOCKERENV ? "ws://0.0.0.0:8546" : "ws://bfa:8546";
const BFA_NETWORK_ID = "12345";

const collection = "transactions";
const database = "crypto-dragons";
const mongoUrl = !process.env.DOCKERENV ? `mongodb://0.0.0.0:27017/${database}` : `mongodb://mongo:27017/${database}`;

const sidechainApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://loom';
const sidechainApiPort = 8001;

const mainchainApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://bfa';
const mainchainApiPort = 8002;

const oracleApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://oracle';
const oracleApiPort = 8081;

const SidechainDragonContract = require("../contracts_jsons/DappchainTransferableDragon");
const SidechainGatewayContract = require("../contracts_jsons/DappchainGateway");

const MainChainGateway = require("../contracts_jsons/MainnetGateway");
const MainchainDragonContract = require("../contracts_jsons/MainnetTransferableDragon");
//const MainChainGateway = require("../contracts_jsons/MainnetTransferableDragon");

module.exports = {
    CHAIN_ID,
    WRITE_URL,
    READ_URL,
    BFA_NETWORK_ID,
    BFA_SOCKET_CONNECTION,
    collection,
    database,
    mongoUrl,
    sidechainApiUrl,
    sidechainApiPort,
    mainchainApiUrl,
    mainchainApiPort,
    oracleApiUrl,
    oracleApiPort,
    SidechainDragonContract,
    SidechainGatewayContract,
    MainChainGateway,
    MainchainDragonContract
};
