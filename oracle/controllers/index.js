const {
	collection, database, mongoUrl
} = require('../config');
const { collectEventsFromSidechainGateway, collectEventsFromMainchainGateway } = require('../mongo-utils');

const getDragonsFromSidechainGateway = new Promise((res, rej) => {
	collectEventsFromSidechainGateway(database, mongoUrl, collection)
		.then(result => res({ 'sidechain-gateway-results': result }))
		.catch(err => rej(err));
});

const getDragonsFromMainchainGateway = new Promise((res, rej) => {
	collectEventsFromMainchainGateway(database, mongoUrl, collection)
		.then(result => res({ 'mainchain-gateway-results': result }))
		.catch(err => rej(err));
});

function getDragonsInGateways(req, res) {
	Promise.all([ getDragonsFromSidechainGateway, getDragonsFromMainchainGateway ])
		.then(values => res.status(200).send(values))
		.catch(err => res.status(500).send(err));
}

module.exports = {
    getDragonsInGateways,
};
