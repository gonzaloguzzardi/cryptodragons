const axios = require('axios');

const {
	mainchainApiUrl, mainchainApiPort,
	collection, database, mongoUrl
} = require('../config');
const { 
	collectEventsFromSidechainGateway,
} = require('../mongo-utils');

function sendMessageToMain(dragons) {
	axios
		.post(`${mainchainApiUrl}:${mainchainApiPort}/api/dragon/receive`, { dragons })
		.then(res => {
			console.log(`URL: ${mainchainApiUrl}:${mainchainApiPort}/api/dragon/receive`);
			console.log("[RECEIVE-MAINCHAIN-SUCCESS]:", res.status);
		})
		.catch(err => console.error("[RECEIVE-MAINCHAIN-ERROR]:", err));
}

function collectFromSidechainGatewayAndSendToMainchain() {
	collectEventsFromSidechainGateway(database, mongoUrl, collection)
		.then((result) => {
			const dragons = result.map(event => ( event.returnValues ));
			if (dragons.length > 0) {
				sendMessageToMain(dragons);
			}
		})
		.catch(err => console.error(err));
}

module.exports = collectFromSidechainGatewayAndSendToMainchain;
