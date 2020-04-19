const {
	mapAccount,
	createDragonToken,
	getMyDragons,
	getDragonDataById,
	transferDragonToGateway,
	receiveDragonFromOracle,
} = require('./service');
const listenMainChainEvents = require('./listen-mainchain-events');

module.exports = {
	mapAccount,
	createDragonToken,
	getMyDragons,
	getDragonDataById,
	transferDragonToGateway,
	receiveDragonFromOracle,
	listenMainChainEvents,
};
