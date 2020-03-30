const axios = require('axios');
const {
	sidechainApiUrl, sidechainApiPort,
	mainchainApiUrl, mainchainApiPort,
} = require('../config');

function transferDragon(req, res) {
	if (req.query.toMain === 'true') {
		axios
			.get(`${sidechainApiUrl}:${sidechainApiPort}/api/dragon/transfer?`, { params: { id: req.query.id } })
			.then(response => res.status(200).send(response));
	} else {
		axios
			.get(`${mainchainApiUrl}:${mainchainApiPort}/api/dragon/transfer?`, { params: { id: req.query.id } })
			.then(response => res.status(200).send(response));
	}
}

module.exports = {
	transferDragon,
};
