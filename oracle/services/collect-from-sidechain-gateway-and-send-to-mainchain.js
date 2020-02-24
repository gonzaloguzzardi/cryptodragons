const request = require('request');

const { 
	mainchainApiUrl, mainchainApiPort,
	collection, database, mongoUrl
} = require('../config');
const { collectEventsFromSidechainGateway } = require('../mongo-utils');

function sendMessageToMain(message) {
	request.post(
		{
			headers: { 'content-type': 'application/json' },
			url: `${mainchainApiUrl}:${mainchainApiPort}/api/dragon/receive`,
			body: message,
			json: true,
		},
		function (error, response, body) {
			if (error) {
				console.log("Starting roll back...");
				console.log(body);
				// sideList.push(message);
				// sendMessageToSide(message);
			} else {
				console.log(`url: ${mainchainApiUrl}:${mainchainApiPort}/api/dragon/receive`);
				console.log("Envio exitoso...");
			}
		}
	);
	console.log("enviando mensaje a la main chain...");
}

function collectFromSidechainGatewayAndSendToMainchain() {
	collectEventsFromSidechainGateway(database, mongoUrl, collection)
		.then((result) => {
			const dragonsToSend = result;
			while (dragonsToSend.length > 0) {
				const message = dragonsToSend.shift();
				console.log("MENSAJE", message.event);
				// BIEN, ahora hay que mandarlo!
				// sendMessageToMain(message);
			}
		});
}

module.exports = collectFromSidechainGatewayAndSendToMainchain;
