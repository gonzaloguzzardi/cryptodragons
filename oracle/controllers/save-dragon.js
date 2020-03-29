// MONGO-DB
const {
	insertOnMongo
} = require('../mongo-utils');

// CONSTANTS
const {
	database, mongoUrl
} = require ('../config');

function saveDragon(req, res) {
	insertOnMongo(database, mongoUrl, req.query.dragon, "errors");
	res.status(200).send(true);
}

module.exports =  { saveDragon };
