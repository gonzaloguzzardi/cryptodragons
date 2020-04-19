const axios = require('axios');
const { oracleApiPort, oracleApiUrl } = require('../config');

function saveDragonOnOracle(dragon) {
	axios.post(`${oracleApiUrl}:${oracleApiPort}/api/saveDragon`, dragon);
}

function deleteDragonInOracle(dragon) {
	axios.post(`${oracleApiUrl}:${oracleApiPort}/api/deleteDragon`, dragon);
}

function insertDragonInOracle(dragon) {
	axios.post(`${oracleApiUrl}:${oracleApiPort}/api/insertDragon`, dragon);
}

module.exports = {
	saveDragonOnOracle,
	deleteDragonInOracle,
	insertDragonInOracle,
};
