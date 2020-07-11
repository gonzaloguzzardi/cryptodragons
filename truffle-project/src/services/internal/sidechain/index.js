const {
	mapAccount,
	createDragonToken,
	getMyDragons,
	getDragonDataById,
	transferDragonToGateway,
	receiveDragonFromOracle,
	isMap,
} = require('./service');
const listenSideChainEvents = require('./listen-sidechain-events');

module.exports = {
	isMap,
	mapAccount,
	createDragonToken,
	getMyDragons,
	getDragonDataById,
	transferDragonToGateway,
	receiveDragonFromOracle,
	listenSideChainEvents,
};
