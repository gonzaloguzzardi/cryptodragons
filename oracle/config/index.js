const collection = 'transactions';
const database = 'crypto-dragons';
const mongoUrl = !process.env.DOCKERENV ? `mongodb://0.0.0.0:27017/${database}` : `mongodb://mongo:27017/${database}`;

const sidechainApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://sidechain-deploy-and-cli';
const sidechainApiPort = 8001;

const mainchainApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://mainchain-deploy-and-cli';
const mainchainApiPort = 8002;

const oracleApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://oracle';
const oracleApiPort = 8081;

const contractGetterApiUrl = !process.env.DOCKERENV ? 'http://localhost' : 'http://contractGetter';
const contractGetterApiPort = 8082;

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
