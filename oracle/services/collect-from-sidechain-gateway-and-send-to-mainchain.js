const axios = require('axios');

const {
	mainchainApiUrl, mainchainApiPort,
	collection, database, mongoUrl
} = require('../config');
const { 
	collectEventsFromSidechainGateway,
} = require('../mongo-utils');

function sendMessageToMain(dragons) {
	axios.post(
		{
			headers: { 'content-type': 'application/json' },
			url: `${mainchainApiUrl}:${mainchainApiPort}/api/dragon/receive`,
			body: dragons,
			json: true,
		},
		function (error, response, body) {
			console.log(`URL: ${mainchainApiUrl}:${mainchainApiPort}/api/dragon/receive`);
			if (response && response.statusCode === 200) {
				console.log("[RECEIVE-MAINCHAIN-SUCCESS]:");
			} else {
				console.log("[RECEIVE-MAINCHAIN-ERROR]: Starting roll back...");
			}
		}
	);
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
