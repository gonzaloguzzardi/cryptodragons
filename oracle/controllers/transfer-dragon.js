const request = require('request');
const {
	sidechainApiUrl, sidechainApiPort,
	mainchainApiUrl, mainchainApiPort,
} = require('../config');

function transferDragon(req, res) {
	if (req.query.toMain) {
		request.get(
			{
				headers: { 'content-type': 'application/json' },
				url: `${sidechainApiUrl}:${sidechainApiPort}/api/dragon/transfer?id=` + req.query.id,
				json: true,
			},
			function (error, response, body) {
				res.status(200).send(response);
			}
		);
	} else {
		request.get(
			{
				headers: { 'content-type': 'application/json' },
				url: `${mainchainApiUrl}:${mainchainApiPort}/api/dragon/transfer?id=` + req.query.id,
				json: true,
			},
			function (error, response, body) {
				res.status(200).send(response);
			}
		);
	}
}

module.exports = {
	transferDragon,
};
