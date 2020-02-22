const request = require('request');
const { mainchainApiUrl, mainchainApiPort } = require ('../config');

let sideList = [], message = {};

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
	let i = 0;
	while (sideList.length > 0 && i < 10) {
		message = sideList.shift();
		console.log(`Enviando dragon con id ${message.id} a la mainchain`);
		sendMessageToMain(message);
		i++;
	}
}

module.exports = {
    collectFromSidechainGatewayAndSendToMainchain,
};
