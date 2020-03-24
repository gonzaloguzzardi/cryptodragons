const request = require('request');
const {
	sidechainApiUrl, sidechainApiPort,
	mainchainApiUrl, mainchainApiPort,
} = require('../config');

function mapAccounts(req, res) {
    console.log("Main account: " + req.query.mainAccount);
    console.log("Side account: " + req.query.sideAccount);
    request.get(
        {
            headers: { 'content-type': 'application/json' },
            url: `${sidechainApiUrl}:${sidechainApiPort}/api/mapAccount?mainAccount=` + req.query.mainAccount + `&account=` + req.query.sideAccount,
            json: true,
        },
        function (error, response, body) {
            console.log(error);
        }
    );
    request.get(
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
