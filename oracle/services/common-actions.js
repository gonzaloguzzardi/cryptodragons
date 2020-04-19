// MONGO-DB
const {
	insertOnMongo, transforEventIntoTransactionObj, deleteDragon,
} = require('../mongo-utils');

// CONSTANTS
const {
	collection, database, mongoUrl,
} = require ('../config');

function insertDragonInMongo(event) {
	return insertOnMongo(database, mongoUrl, transforEventIntoTransactionObj(event), collection);
}

function deleteDragonFromMongo(event) {
	return deleteDragon(database, mongoUrl, collection, event.returnValues);
}

module.exports = {
	deleteDragonFromMongo,
	insertDragonInMongo
};
