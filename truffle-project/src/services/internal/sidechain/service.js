/* eslint-disable prettier/prettier */
const {
	_sMapAccountSideChain,
	_sReceiveDragonFromOracle,
	_isMap
} = require('../../index.js');


// -> MOVIDO
						const DappchainDragonTokenJson = require('../../../contracts/DappchainTransferableDragon.json');
						const GatewayJson = require('../../../contracts/DappchainGateway');

						const loomChainId = '13654820909954'; // TODO ver si cambia o si es siempre el mismo

						async function getLoomTokenContract(web3js) {
							return new web3js.eth.Contract(DappchainDragonTokenJson.abi, DappchainDragonTokenJson.networks[loomChainId].address);
						}

						async function getLoomGatewayContract(web3js) {
							return new web3js.eth.Contract(GatewayJson.abi, GatewayJson.networks[loomChainId].address);
						}
// <- MOVIDO

async function mapAccount(web3js, ownerAccount, gas, mainAccount) {
	const contract = await getLoomTokenContract(web3js);
	return _sMapAccountSideChain(contract, ownerAccount, gas, mainAccount);
}

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
	mapAccount,
	receiveDragonFromOracle,
};
