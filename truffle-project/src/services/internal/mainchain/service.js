/* eslint-disable prettier/prettier */
const {
	_isMap,
	_sMapAccountMainChain,
	_sCreateDragonToken,
	_sGetMyDragons,
	_sGetDragonDataById,
	_sTransferDragonToGateway,
	_sReceiveDragonFromOracle,
} = require('../../index.js');

// -> MOVIDO
					const MainchainDragonTokenJson = require('../../../contracts/MainnetTransferableDragon.json');
					const GatewayJson = require('../../../contracts/MainnetGateway.json');

					async function getMainNetTokenContract(web3js) {
						const networkId = await web3js.eth.net.getId();
						return new web3js.eth.Contract(MainchainDragonTokenJson.abi, MainchainDragonTokenJson.networks[networkId].address);
					}

					async function getMainNetGatewayContract(web3js) {
						const networkId = await web3js.eth.net.getId();
						return new web3js.eth.Contract(GatewayJson.abi, GatewayJson.networks[networkId].address);
					}
// <- MOVIDO

async function mapAccount(web3js, ownerAccount, gas, sideAccount) {
	const contract = await getMainNetTokenContract(web3js);
	return _sMapAccountMainChain(contract, ownerAccount, gas, sideAccount);
}

// -> MOVIDO
					async function createDragonToken(web3js, ownerAccount, gas) {
						const contract = await getMainNetTokenContract(web3js);
						return _sCreateDragonToken(contract, ownerAccount, gas);
					}
// <- MOVIDO

async function getMyDragons(web3js, ownerAccount, gas) {
	const contract = await getMainNetTokenContract(web3js);
	return _sGetMyDragons(contract, ownerAccount, gas);
}

async function getDragonDataById(web3js, ownerAccount, dragonId, gas) {
	const contract = await getMainNetTokenContract(web3js);
	return _sGetDragonDataById(contract, ownerAccount, dragonId, gas);
}

async function transferDragonToGateway(web3js, gas, ownerAccount, dragonId) {
	const contract = await getMainNetTokenContract(web3js);
	return _sTransferDragonToGateway(contract, gas, ownerAccount, dragonId);
}

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
	mapAccount,
	createDragonToken,
	getMyDragons,
	getDragonDataById,
	transferDragonToGateway,
	receiveDragonFromOracle,
};
