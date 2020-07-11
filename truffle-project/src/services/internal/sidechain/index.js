const { mapAccount, getDragonDataById, transferDragonToGateway, receiveDragonFromOracle, isMap } = require('./service');
const listenSideChainEvents = require('./listen-sidechain-events');

module.exports = {
	isMap,
	mapAccount,
	getDragonDataById,
	transferDragonToGateway,
	receiveDragonFromOracle,
	listenSideChainEvents,
};
