const axios = require('axios');
const { sidechainApiUrl, sidechainApiPort, mainchainApiUrl, mainchainApiPort } = require('../config');

function mapAccounts(req, res) {
	console.log(`Main account: ${req.query.mainAccount}`);
	console.log(`Side account: ${req.query.sideAccount}`);

	axios
		.get(
			`${sidechainApiUrl}:${sidechainApiPort}/api/mapAccount?mainAccount=${req.query.mainAccount}&account=${req.query.sideAccount}`,
		)
		.catch((err) => res.status(500).send(err));

	axios
		.get(
			`${mainchainApiUrl}:${mainchainApiPort}/api/mapAccount?sideAccount=${req.query.sideAccount}&account=${req.query.mainAccount}`,
		)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(500).send(err));
}

module.exports = {
	mapAccounts,
};
