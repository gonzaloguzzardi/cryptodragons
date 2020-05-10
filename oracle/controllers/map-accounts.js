const axios = require('axios');
const { sidechainApiUrl, sidechainApiPort, mainchainApiUrl, mainchainApiPort } = require('../config');

function mapAccounts(req, res) {
	console.log(`Main account: ${req.body.mainAccount}`);
	console.log(`Side account: ${req.body.sideAccount}`);
	console.log(`Side private: ${req.body.sideprivateAccount}`);

	axios
		.post(
			`${sidechainApiUrl}:${sidechainApiPort}/api/mapAccount`,{
				mainAccount: req.body.mainAccount,
				account: req.body.sideprivateAccount
			}
		)
		.catch((err) => res.status(500).send(err));

	axios
		.get(
			`${mainchainApiUrl}:${mainchainApiPort}/api/mapAccount?sideAccount=${req.body.sideAccount}&account=${req.body.mainAccount}`,
		)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(500).send(err));
}

module.exports = {
	mapAccounts,
};
