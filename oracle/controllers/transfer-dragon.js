const axios = require('axios');
const { sidechainApiUrl, sidechainApiPort, mainchainApiUrl, mainchainApiPort } = require('../config');

function transferDragon(req, res) {
	if (req.query.toMain === 'true') {
		axios
			.get(`${sidechainApiUrl}:${sidechainApiPort}/api/dragon/transfer?`, { params: { id: req.query.id, account: req.query.account } })
			.then((response) => res.status(200).send(response.data))
			.catch((err) => console.error(err) || res.status(500).send(JSON.stringify(err)));
	} else {
		axios
			.get(`${mainchainApiUrl}:${mainchainApiPort}/api/dragon/transfer?`, { params: { id: req.query.id, account: req.query.account } })
			.then((response) => res.status(200).send(response.data))
			.catch((err) => console.error(err) || res.status(500).send(JSON.stringify(err)));
	}
}

module.exports = {
	transferDragon,
};
