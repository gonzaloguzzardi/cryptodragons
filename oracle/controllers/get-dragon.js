const axios = require('axios');
const { sidechainApiUrl, sidechainApiPort, mainchainApiUrl, mainchainApiPort } = require('../config');

function getDragon(req, res) {
	switch (req.query.location) {
		case 'side': // if (x === 'value1')
			axios
				.get(`${sidechainApiUrl}:${sidechainApiPort}/api/dragon?id=${req.query.id}`)
				.then((response) => res.status(200).send(response.data))
				.catch((err) => res.status(500).send(err));
			break;
		case 'main': // if (x === 'value2')
			axios
				.get(`${mainchainApiUrl}:${mainchainApiPort}/api/dragon?id=${req.query.id}`)
				.then((response) => res.status(200).send(response.data))
				.catch((err) => res.status(500).send(err));
			break;
		default:
			res.status(200).send('');
	}
}

module.exports = {
	getDragon,
};
