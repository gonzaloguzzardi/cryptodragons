const axios = require('axios');
const {
	sidechainApiUrl, sidechainApiPort,
	mainchainApiUrl, mainchainApiPort,
} = require('../config');

function transferDragon(req, res) {
	if (req.query.toMain === 'true') {
		axios.get(
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
		axios.get(
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
