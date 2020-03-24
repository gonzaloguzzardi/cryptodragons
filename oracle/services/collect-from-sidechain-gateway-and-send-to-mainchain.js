const request = require('request');

const {
	mainchainApiUrl, mainchainApiPort,
	collection, database, mongoUrl
} = require('../config');
const { 
	collectEventsFromSidechainGateway,
	deleteDragons,
} = require('../mongo-utils');

function sendMessageToMain(dragons) {
	request.post(
		{
			headers: { 'content-type': 'application/json' },
			url: `${mainchainApiUrl}:${mainchainApiPort}/api/dragon/receive`,
			body: dragons,
			json: true,
		},
		function (error, response, body) {
			if (error) {
				console.log("[RECEIVE-MAINCHAIN-ERROR]: Starting roll back...");
			} else {
				// console.log("[RECEIVE-MAINCHAIN-SUCCESS]:", response);
				console.log(`URL: ${mainchainApiUrl}:${mainchainApiPort}/api/dragon/receive`);
				deleteDragons(database, mongoUrl, collection, dragons);
			}
		}
	);
}

function collectFromSidechainGatewayAndSendToMainchain() {
	collectEventsFromSidechainGateway(database, mongoUrl, collection)
		.then((result) => {
			const dragons = result.map(event => ( event.returnValues ));
			// console.log("[DRAGONS IDS]:", dragons);
			if (dragons.length > 0) {
				sendMessageToMain(dragons);
			}
		})
		.catch(err => console.error(err));
}

module.exports = collectFromSidechainGatewayAndSendToMainchain;
