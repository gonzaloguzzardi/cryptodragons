/* eslint-disable prettier/prettier */
const {
	_sReceiveDragonFromOracle,
	_isMap
} = require('../../index.js');

async function receiveDragonFromOracle(web3js, ownerAccount, gas, dragonId, data, receiverAddress) {
	const contract = await getLoomGatewayContract(web3js);
	return _sReceiveDragonFromOracle(contract, ownerAccount, gas, dragonId, data, receiverAddress);
}

async function isMap(web3js, ownerAccount, gas, mainAccount) {
	const contract = await getLoomTokenContract(web3js);
	return _isMap(contract, ownerAccount, gas, mainAccount);
}

module.exports = {
	isMap,
	receiveDragonFromOracle,
};
