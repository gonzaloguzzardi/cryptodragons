/* eslint-disable prettier/prettier */
const {
	_isMap,
} = require('../../index.js');

async function isMap(web3js, ownerAccount, gas, sideAccount) {
	const contract = await getMainNetTokenContract(web3js);
	return _isMap(contract, ownerAccount, gas, sideAccount);
}

module.exports = {
	isMap,
};
