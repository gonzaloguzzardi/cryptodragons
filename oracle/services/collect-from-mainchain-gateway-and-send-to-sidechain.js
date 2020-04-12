const axios = require('axios');
const {
	sidechainApiUrl, sidechainApiPort,
	collection, database, mongoUrl,
} = require ('../config');
const { 
	collectEventsFromMainchainGateway,
} = require('../mongo-utils');

function sendMessageToSide(message) {
	axios
		.post(`${sidechainApiUrl}:${sidechainApiPort}/api/dragon/receive`, { dragons: message })
		.then(res => {
			console.log(`URL: ${sidechainApiUrl}:${sidechainApiPort}/api/dragon/receive`);
			console.log("[RECEIVE-SIDECHAIN-SUCCESS]:", res.status);
		})
		.catch(err => console.error("[RECEIVE-SIDECHAIN-ERROR]:", err));
}

function collectFromMainchainGatewayAndSendToSidechain() {
	collectEventsFromMainchainGateway(database, mongoUrl, collection)
		.then((result) => {
			const dragons = result.map(event => ( event.returnValues ));
			if (dragons.length > 0) {
				sendMessageToSide(dragons);
			}
		})
		.catch(err => console.error(err));
}

module.exports = collectFromMainchainGatewayAndSendToSidechain;
