const request = require('request');
const {
	sidechainApiUrl, sidechainApiPort,
	collection, database, mongoUrl,
} = require ('../config');
const { 
	collectEventsFromMainchainGateway,
} = require('../mongo-utils');

function sendMessageToSide(message) {
	request.post(
		{
			headers: { 'content-type': 'application/json' },
			url: `${sidechainApiUrl}:${sidechainApiPort}/api/dragon/receive`,
			body: message,
			json: true,
		},
		function (error, response, body) {
			console.log(`URL: ${sidechainApiUrl}:${sidechainApiPort}/api/dragon/receive`);
			if (response.statusCode != 200) {
				console.log("[RECEIVE-SIDECHAIN-ERROR]: Starting roll back...");
			} else {
				console.log("[RECEIVE-SIDECHAIN-SUCCESS]:");
			}
		}
	);
	console.log("enviando mensaje a la side chain...");
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
