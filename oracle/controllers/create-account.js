const axios = require('axios');
const { sidechainApiUrl, sidechainApiPort, mainchainApiUrl, mainchainApiPort } = require('../config');
const { insertOnMongo,collectAll } = require('../mongo-utils');
const { database, mongoUrl } = require('../config');

function giveSomeMoney(account) {
    axios.get(`${mainchainApiUrl}:${mainchainApiPort}/api/giveSomeMoney?account=` + account);
}

function getOrCreateSideAccount(req, res) {
    const event = {
        'mainAccount': req.query.account
    }
	collectAll(event, database, mongoUrl, 'accounts')
		.then((result) => {
            console.log(result);
            if (result.length > 0) {
                result[0].isFirst = false;
                res.status(200).send(result[0])
            } else {
                axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/account/create`).then(result => {
                    const account = {
                        'mainAccount': req.query.account,
                        'sidePrivateKey': result.data.private,
                        'sideAccount': result.data.account   
                    };
                    insertOnMongo(database, mongoUrl, account, 'accounts')
                    .then((result) => {
                        account.isFirst = true;
                        res.status(200).send(account)
                    })
                    .catch((err) => res.status(500).send(err));

                    giveSomeMoney(req.query.account);

                }).catch(errors => {
                    res.status(500).send(errors);
                });
            }
        })
        .catch((err) => res.status(500).send({}));
}

module.exports = {
    getOrCreateSideAccount
};