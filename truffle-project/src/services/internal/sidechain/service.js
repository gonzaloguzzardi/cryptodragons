/* eslint-disable prettier/prettier */
const {
	_isMap
} = require('../../index.js');

async function isMap(web3js, ownerAccount, gas, mainAccount) {
	const contract = await getLoomTokenContract(web3js);
	return _isMap(contract, ownerAccount, gas, mainAccount);
}

module.exports = {
	isMap,
};
