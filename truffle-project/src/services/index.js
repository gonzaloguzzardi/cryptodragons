const { 
    _sMapAccountSideChain,
    _sMapAccountMainChain,
    _sCreateDragonToken,
    _sGetMyDragons,
    _sGetDragonDataById,
    _sTransferDragonToGateway,
    _sReceiveDragonFromOracle
} = require('./common');

const {
    saveDragonOnOracle,

} = require('./oracleActions')

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
