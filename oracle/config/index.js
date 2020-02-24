const CHAIN_ID = "default";
const WRITE_URL = "ws://0.0.0.0:46658/websocket";
const READ_URL = "ws://0.0.0.0:46658/queryws";
const API_PORT = 8081;
const collection = "transactions";
const database = "crypto-dragons";
const url = "mongodb://0.0.0.0:27017/" + database;

const sidechainApiUrl = 'http://localhost';
const sidechainApiPort = 8001;

const mainchainApiUrl = 'http://localhost';
const mainchainApiPort = 8002;

const oracleApiUrl = 'http://localhost';
const oracleApiPort = 8081;

const SidechainDragonContract = require("../contracts_jsons/DappchainTransferableDragon");
const SidechainGatewayContract = require("../contracts_jsons/DappchainGateway");

const MainChainGateway = require("../contracts_jsons/MainnetGateway");
//const MainChainGateway = require("../contracts_jsons/MainnetTransferableDragon");

module.exports = {
    CHAIN_ID,
    WRITE_URL,
    READ_URL,
    API_PORT,
    collection,
    database,
    url,
    sidechainApiUrl,
    sidechainApiPort,
    mainchainApiUrl,
    mainchainApiPort,
    oracleApiUrl,
    oracleApiPort,
    SidechainDragonContract,
    SidechainGatewayContract,
    MainChainGateway,
};
