/* eslint-disable prettier/prettier */
const {
	_isMap,
	_sReceiveDragonFromOracle,
} = require('../../index.js');

async function receiveDragonFromOracle(web3js, ownerAccount, gas, dragonId, data, receiverAddress) {
	const contract = await getMainNetGatewayContract(web3js);
	return _sReceiveDragonFromOracle(contract, ownerAccount, gas, dragonId, data, receiverAddress);
}

async function isMap(web3js, ownerAccount, gas, sideAccount) {
	const contract = await getMainNetTokenContract(web3js);
	return _isMap(contract, ownerAccount, gas, sideAccount);
}

module.exports = {
	isMap,
	receiveDragonFromOracle,
};
