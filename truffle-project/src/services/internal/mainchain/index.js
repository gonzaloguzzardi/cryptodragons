const { isMap, mapAccount, getDragonDataById, transferDragonToGateway, receiveDragonFromOracle } = require('./service');
const listenMainChainEvents = require('./listen-mainchain-events');

module.exports = {
	isMap,
	mapAccount,
	getDragonDataById,
	transferDragonToGateway,
	receiveDragonFromOracle,
	listenMainChainEvents,
};
