const {
	_sMapAccountSideChain,
	_sMapAccountMainChain,
	_sTransferDragonToGateway,
	_sReceiveDragonFromOracle,
	_isMap,
} = require('./commons');

const { saveDragonOnOracle } = require('./oracle-actions');

module.exports = {
	_sMapAccountSideChain,
	_sMapAccountMainChain,
	_sTransferDragonToGateway,
	_sReceiveDragonFromOracle,
	saveDragonOnOracle,
	_isMap,
};
