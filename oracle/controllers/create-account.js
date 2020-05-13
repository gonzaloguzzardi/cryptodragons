const axios = require('axios');
const { sidechainApiUrl, sidechainApiPort, mainchainApiUrl, mainchainApiPort } = require('../config');
const { insertOnMongo,collectAll } = require('../mongo-utils');
const { database, mongoUrl } = require('../config');

function createAccount(req, res) {

    const createAccountSide = axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/account/create`);
    const createAccountMain = axios.get(`${mainchainApiUrl}:${mainchainApiPort}/api/account/create`);
    
    axios.all([createAccountSide, createAccountMain]).then(axios.spread((...responses) => {
        const sideAccount = responses[0].data;
        const mainAccount = responses[1].data;
        console.log('sideAccount: ' + sideAccount);
        console.log('mainAccount: ' + mainAccount);
        //const mapAccountSide = axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/mapAccount?mainAccount=${mainAccount}&account=${sideAccount.account}`);
        //const mapAccountMain = axios.get(`${mainchainApiUrl}:${mainchainApiPort}/api/mapAccount?sideAccount=${sideAccount.account}&account=${mainAccount}`);
        //axios.all([mapAccountSide, mapAccountMain]).then(axios.spread((...responses) => {
        //    console.log('map side account: ' + sideAccount.private + ' with main account: ' + mainAccount );

            const account = {
                'account': req.query.account,
                'password': req.query.password,
                'mainAccount': mainAccount,
                'sideAccount': sideAccount.private,
                'sideMapAccount': sideAccount.account   
            };

            insertOnMongo(database, mongoUrl, account, 'accounts')
            .then((result) => res.status(200).send(result))
            .catch((err) => res.status(500).send(err));
            
        //})).catch(errors => {
        //    res.status(500).send(errors)
        //})
    })).catch(errors => {
        res.status(500).send(err);
    });
}

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
                res.status(200).send(result[0])
            } else {
                axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/account/create`).then(result => {
                    const account = {
                        'mainAccount': req.query.account,
                        'sideAccount': result.data.private,
                        'sideMapAccount': result.data.account   
                    };
                    insertOnMongo(database, mongoUrl, account, 'accounts')
                    .then((result) => res.status(200).send(account))
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
    createAccount,
    getOrCreateSideAccount
};
