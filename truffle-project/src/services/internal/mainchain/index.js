const {
	isMap,
	mapAccount,
	createDragonToken,
	getMyDragons,
	getDragonDataById,
	transferDragonToGateway,
	receiveDragonFromOracle,
} = require('./service');
const listenMainChainEvents = require('./listen-mainchain-events');

module.exports = {
	isMap,
	mapAccount,
	createDragonToken,
	getMyDragons,
	getDragonDataById,
	transferDragonToGateway,
	receiveDragonFromOracle,
	listenMainChainEvents,
};
