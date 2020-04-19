const {
	deleteDragonFromMongo,
	insertDragonInMongo
} = require('../services');

function deleteDragon(req, res) {
	console.log('oracle/controllers/commons.js -> deleteDragon');
	deleteDragonFromMongo(req.body)
		.then(response => res.status(200).send(response))
		.catch(err => res.status(500).send(err));
}

function insertDragon(req, res) {
	console.log('oracle/controllers/commons.js -> insertDragon');
	insertDragonInMongo(req.body)
		.then(response => res.status(200).send(response))
		.catch(err => res.status(500).send(err));
}

module.exports = {
    deleteDragon,
    insertDragon
};
