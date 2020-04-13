const { 
    mapAccount,
    createDragonToken,
    getMyDragons,
    getDragonDataById,
    transferDragonToGateway,
    receiveDragonFromOracle
} = require('./service');
const listenSideChainEvents = require('./listen-sidechain-events');

module.exports = {
    mapAccount,
    createDragonToken,
    getMyDragons,
    getDragonDataById,
    transferDragonToGateway,
    receiveDragonFromOracle,    
    listenSideChainEvents,
};
