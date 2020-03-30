const axios = require('axios');
const {
	sidechainApiUrl, sidechainApiPort,
	mainchainApiUrl, mainchainApiPort,
} = require('../config');

function mapAccounts(req, res) {
    console.log("Main account: " + req.query.mainAccount);
    console.log("Side account: " + req.query.sideAccount);
    axios.get(
        {
            headers: { 'content-type': 'application/json' },
            url: `${sidechainApiUrl}:${sidechainApiPort}/api/mapAccount?mainAccount=` + req.query.mainAccount + `&account=` + req.query.sideAccount,
            json: true,
        },
        function (error, response, body) {
            if (error) console.error(error);
        }
    );
    axios.get(
        {
            headers: { 'content-type': 'application/json' },
            url: `${mainchainApiUrl}:${mainchainApiPort}/api/mapAccount?sideAccount=` + req.query.sideAccount + `&account=` + req.query.mainAccount,
            json: true,
        },
        function (error, response, body) {
            res.status(200).send(response);
        }
    );
}

module.exports = {
	mapAccounts,
};
