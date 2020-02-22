const request = require('request');
const { sidechainApiUrl, sidechainApiPort } = require ('../config');

let mainList = [], message = {};

function collectFromMainchainGatewayAndSendToSidechain() {
	let i = 0;
	while (mainList.length > 0 && i < 10) {
		message = mainList.shift();
		sendMessageToSide(message);
		i++;
	}
}

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
				console.log("Starting roll back...");
				console.log(body);
				// sideList.push(message);
				// sendMessageToSide(message);
			} else {
				console.log(`url: ${sidechainApiUrl}:${sidechainApiPort}/api/dragon/receive`);
				console.log("Envio exitoso...");
			}
		}
	);
	console.log("enviando mensaje a la side chain...");
}

module.exports = {
    collectFromMainchainGatewayAndSendToSidechain,
};
