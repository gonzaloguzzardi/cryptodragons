// MONGO-DB
const { insertOnMongo, transforEventIntoTransactionObj, deleteDragon } = require('../mongo-utils');

// CONSTANTS
const { collection, database, mongoUrl } = require('../config');

const insertDragonInMongo = (event) =>
  insertOnMongo(database, mongoUrl, transforEventIntoTransactionObj(event), collection);

const deleteDragonFromMongo = (event) => deleteDragon(database, mongoUrl, collection, event.returnValues);

module.exports = {
  deleteDragonFromMongo,
  insertDragonInMongo,
};
