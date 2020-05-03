// MONGO-DB
const { collectAll } = require('../mongo-utils');

// CONSTANTS
const { database, mongoUrl } = require('../config');
const collection = 'accounts';


function login(req, res) {
    const event = {
        'password': req.query.password,
        'account': req.query.account
    }
	collectAll(event, database, mongoUrl, collection)
		.then((result) => {
            console.log(result);
            if (result.length > 0) {
                res.status(200).send(result[0])
            } else {
                res.status(200).send({})
            }
        })
		.catch((err) => res.status(500).send({}));
}

module.exports = { login };
