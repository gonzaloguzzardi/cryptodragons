const { 
    _sMapAccountSideChain,
    _sMapAccountMainChain,
    _sCreateDragonToken,
    _sGetMyDragons,
    _sGetDragonDataById,
    _sTransferDragonToGateway,
    _sReceiveDragonFromOracle
} = require('./commons');

const { saveDragonOnOracle } = require('./oracle-actions')

module.exports = {
    _sMapAccountSideChain,
    _sMapAccountMainChain,
    _sCreateDragonToken,
    _sGetMyDragons,
    _sGetDragonDataById,
    _sTransferDragonToGateway,
    _sReceiveDragonFromOracle,
    saveDragonOnOracle,  
};
