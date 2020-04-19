const collection = 'transactions';
const database = 'crypto-dragons';
const mongoUrl = `mongodb://0.0.0.0:27017/${database}`;

const sidechainApiUrl = 'http://localhost';
const sidechainApiPort = 8001;

const mainchainApiUrl = 'http://localhost';
const mainchainApiPort = 8002;

const oracleApiUrl = 'http://localhost';
const oracleApiPort = 8081;

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
};
