const {
	collection, database, mongoUrl
} = require('../config');
const { collectEventsFromSidechainGateway, collectEventsFromMainchainGateway } = require('../mongo-utils');

function getDragonsFromSidechainGateway() {
	return new Promise((res, rej) => {
		collectEventsFromSidechainGateway(database, mongoUrl, collection)
			.then(result => res(result))
			.catch(err => rej(err));
	});
}

function getDragonsFromMainchainGateway() {
	return new Promise((res, rej) => {
		collectEventsFromMainchainGateway(database, mongoUrl, collection)
			.then(result => res(result))
			.catch(err => rej(err));
	});
}

function getDragonsInGateways(req, res) {
	Promise.all([ getDragonsFromSidechainGateway, getDragonsFromMainchainGateway ])
		.then(values => res.send(values))
		.catch(err => console.error(err));
}

module.exports = {
    getDragonsInGateways,
};
