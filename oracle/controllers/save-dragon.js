// MONGO-DB
const { insertOnMongo } = require('../mongo-utils');

// CONSTANTS
const { database, mongoUrl } = require('../config');

function saveDragon(req, res) {
	new Promise((res, rej) => {
		insertOnMongo(database, mongoUrl, req.query.dragon, 'errors')
			.then((result) => res.status(200).send(result))
			.catch((err) => res.status(500).send(err));
	});
}

module.exports = { saveDragon };
