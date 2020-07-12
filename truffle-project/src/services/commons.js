/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
async function _isMap(contract, ownerAccount, gas, account) {
	const gasEstimate = await contract.methods
		.isMap(account)
		.estimateGas({ from: ownerAccount, gas });

	if (gasEstimate >= gas) {
		throw new Error('Not enough enough gas, send more.');
	}
	return contract.methods.isMap(account).call({ from: ownerAccount, gas: gasEstimate });
}

module.exports = {
	_isMap,
};
