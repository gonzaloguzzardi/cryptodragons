const {
	isMap,
	mapAccount,
	createDragonToken,
	getMyDragons,
	getDragonDataById,
	transferDragonToGateway,
	receiveDragonFromOracle,
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
