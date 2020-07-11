const { mapAccount, transferDragonToGateway, receiveDragonFromOracle, isMap } = require('./service');
const listenSideChainEvents = require('./listen-sidechain-events');

module.exports = {
	isMap,
	mapAccount,
	transferDragonToGateway,
	receiveDragonFromOracle,
	listenSideChainEvents,
};
