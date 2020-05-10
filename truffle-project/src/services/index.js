const {
	_sMapAccountSideChain,
	_sMapAccountMainChain,
	_sCreateDragonToken,
	_sGetMyDragons,
	_sGetDragonDataById,
	_sTransferDragonToGateway,
	_sReceiveDragonFromOracle,
	_isMap
} = require('./commons');

const { saveDragonOnOracle } = require('./oracle-actions');

module.exports = {
	_isMap,
	_sMapAccountSideChain,
	_sMapAccountMainChain,
	_sCreateDragonToken,
	_sGetMyDragons,
	_sGetDragonDataById,
	_sTransferDragonToGateway,
	_sReceiveDragonFromOracle,
	saveDragonOnOracle,
};
