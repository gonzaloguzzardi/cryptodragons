/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
async function _sMapAccountSideChain(contract, ownerAccount, gas, mainAccount) {
	console.log(`Map account: ${ownerAccount} with main account: ${mainAccount}`);

	const gasEstimate = await contract.methods.mapContractToMainnet(mainAccount).estimateGas({ from: ownerAccount, gas });

	if (gasEstimate >= gas) {
		throw new Error('Not enough enough gas, send more.');
	}
	return contract.methods.mapContractToMainnet(mainAccount).send({ from: ownerAccount, gas: gasEstimate });
}

async function _sMapAccountMainChain(contract, ownerAccount, gas, sideAccount) {
	console.log(`Map account: ${ownerAccount} with side account: ${sideAccount}`);

	const gasEstimate = await contract.methods
		.mapContractToSidechain(sideAccount)
		.estimateGas({ from: ownerAccount, gas });

	if (gasEstimate >= gas) {
		throw new Error('Not enough enough gas, send more.');
	}
	return contract.methods.mapContractToSidechain(sideAccount).send({ from: ownerAccount, gas: gasEstimate });
}

async function _sReceiveDragonFromOracle(contract, ownerAccount, gas, dragonId, data, receiverAddress) {
	const gasEstimate = await contract.methods
		.receiveDragon(receiverAddress, dragonId, data)
		.estimateGas({ from: ownerAccount, gas: 0 });
	if (gasEstimate >= gas) {
		console.log('Not enough enough gas, send more.');
		throw new Error('Not enough enough gas, send more.');
	}

	console.log(`Transfering dragon with address ${receiverAddress}`);
	return await contract.methods.receiveDragon(receiverAddress, dragonId, data).send({ from: ownerAccount, gas });
}

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
	_sMapAccountSideChain,
	_sMapAccountMainChain,
	_sReceiveDragonFromOracle,
};
