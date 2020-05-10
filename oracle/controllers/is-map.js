const axios = require('axios');
const { sidechainApiUrl, sidechainApiPort, mainchainApiUrl, mainchainApiPort } = require('../config');

function isMap(req, res) {
	console.log(`Main account: ${req.body.mainAccount}`);
	console.log(`Side account: ${req.body.sideAccount}`);
	console.log(`Side private: ${req.body.sideprivateAccount}`);
    var result = true;
	axios
		.post(
			`${sidechainApiUrl}:${sidechainApiPort}/api/isMap`,{
				mainAccount: req.body.mainAccount,
				account: req.body.sideprivateAccount
			}
        )
        .then((response) => {
            result = result && response.data;
            axios.get(
                `${mainchainApiUrl}:${mainchainApiPort}/api/isMap?sideAccount=${req.body.sideAccount}&account=${req.body.mainAccount}`,
            )
            .then((response) => {
                console.log(response.data);
                result = result && response.data;
                console.log(result);
                res.status(200).send(result);
            })
            .catch((err) => res.status(500).send(err));
        })
		.catch((err) => res.status(500).send(err));
}

module.exports = {
	isMap,
};
