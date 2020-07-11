const { isMap, mapAccount, transferDragonToGateway, receiveDragonFromOracle } = require('./service');
const listenMainChainEvents = require('./listen-mainchain-events');

module.exports = {
	isMap,
	mapAccount,
	transferDragonToGateway,
	receiveDragonFromOracle,
	listenMainChainEvents,
};
