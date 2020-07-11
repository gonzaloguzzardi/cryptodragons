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

// -> Movido
									async function _sCreateDragonToken(contract, ownerAccount, gas) {
										// createDragon(string memory _name, uint64 _creationTime, uint32 _dadId, uint32 _motherId)

										const gasEstimate = await contract.methods
											.createDragon('test dragon', 1, 2, 2)
											.estimateGas({ from: ownerAccount, gas: 0 });

										if (gasEstimate >= gas) {
											throw new Error('Not enough enough gas, send more.');
										}

										return contract.methods.createDragon('test dragon', 1, 2, 2).send({ from: ownerAccount, gas: gasEstimate });
									}
// <- Movido

async function _sGetMyDragons(contract, ownerAccount, gas) {
	const gasEstimate = await contract.methods
		.getDragonsIdsByOwner(ownerAccount)
		.estimateGas({ from: ownerAccount, gas: 0 });

	if (gasEstimate >= gas) {
		throw new Error('Not enough enough gas, send more.');
	}

	return await contract.methods.getDragonsIdsByOwner(ownerAccount).call({ from: ownerAccount, gas: gasEstimate });
}

async function _sGetDragonDataById(contract, ownerAccount, dragonId) {
	const gasEstimate = await contract.methods.getDragonById(dragonId).estimateGas({ from: ownerAccount, gas: 0 });

	return await contract.methods.getDragonById(dragonId).call({ from: ownerAccount, gasEstimate });
}

async function _sTransferDragonToGateway(contract, gas, ownerAccount, dragonId) {
	const gasEstimate = await contract.methods.transferToGateway(dragonId).estimateGas({ from: ownerAccount, gas: 0 });

	if (gasEstimate >= gas) {
		throw new Error('Not enough enough gas, send more.');
	}

	return await contract.methods.transferToGateway(dragonId).send({ from: ownerAccount, gas: gasEstimate });
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
	_sCreateDragonToken,
	_sGetMyDragons,
	_sGetDragonDataById,
	_sTransferDragonToGateway,
	_sReceiveDragonFromOracle,
};
