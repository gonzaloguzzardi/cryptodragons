const request = require('request');
const {
	sidechainApiUrl, sidechainApiPort,
	collection, database, mongoUrl,
} = require ('../config');
const { 
	collectEventsFromMainchainGateway,
	deleteDragons,
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
			if (error) {
				console.log("[RECEIVE-SIDECHAIN-ERROR]: Starting roll back...");
			} else {
				console.log("[RECEIVE-SIDECHAIN-SUCCESS]:", response);
				console.log(`URL: ${sidechainApiUrl}:${sidechainApiPort}/api/dragon/receive`);
				deleteDragons(database, mongoUrl, collection, message);
			}
		}
	);
	console.log("enviando mensaje a la side chain...");
}

function collectFromMainchainGatewayAndSendToSidechain() {
	collectEventsFromMainchainGateway(database, mongoUrl, collection)
		.then((result) => {
			const dragons = result.map(event => ( event.returnValues ));
			// console.log("[DRAGONS IDS]:", dragons);
			if (dragons.length > 0) {
				sendMessageToSide(dragons);
			}
		})
		.catch(err => console.error(err));
}

module.exports = collectFromMainchainGatewayAndSendToSidechain;
