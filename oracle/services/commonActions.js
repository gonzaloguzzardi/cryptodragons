// MONGO-DB
const {
	insertOnMongo, transforEventIntoTransactionObj, deleteDragon,
} = require('../mongo-utils');

// CONSTANTS
const {
	collection, database, mongoUrl,
} = require ('../config');

function insertDragon(event) {
	insertOnMongo(database, mongoUrl, transforEventIntoTransactionObj(event), collection);
}

function deleteADragon(event) {
	deleteDragon(database, mongoUrl, collection, event.returnValues);
}

module.exports = {
	deleteADragon,
	insertDragon
};
