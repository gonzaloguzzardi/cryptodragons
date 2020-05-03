const axios = require('axios');
const { sidechainApiUrl, sidechainApiPort, mainchainApiUrl, mainchainApiPort } = require('../config');
const { insertOnMongo } = require('../mongo-utils');
const { database, mongoUrl } = require('../config');

function createAccount(req, res) {

    const createAccountSide = axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/account/create`);
    const createAccountMain = axios.get(`${mainchainApiUrl}:${mainchainApiPort}/api/account/create`);
    
    axios.all([createAccountSide, createAccountMain]).then(axios.spread((...responses) => {
        const sideAccount = responses[0].data;
        const mainAccount = responses[1].data;
        console.log('sideAccount: ' + sideAccount);
        console.log('mainAccount: ' + mainAccount);
        // const mapAccountSide = axios.get(`${sidechainApiUrl}:${sidechainApiPort}/api/mapAccount?mainAccount=${mainAccount}&account=${sideAccount}`);
        // const mapAccountMain = axios.get(`${mainchainApiUrl}:${mainchainApiPort}/api/mapAccount?sideAccount=${sideAccount}&account=${mainAccount}`);

        // axios.all([mapAccountSide, mapAccountMain]).then(axios.spread((...responses) => {
            console.log('map side account: ' + sideAccount + ' with main account: ' + mainAccount );

            const account = {
                'account': req.query.account,
                'password': req.query.password,
                'mainAccount': mainAccount,
                'sideAccount': sideAccount   
            };

            insertOnMongo(database, mongoUrl, account, 'accounts')
            .then((result) => res.status(200).send(result))
            .catch((err) => res.status(500).send(err));
            
        // })).catch(errors => {
        //     res.status(500).send(errors)
        // })
    })).catch(errors => {
        res.status(500).send(err);
    });
}

module.exports = {
	createAccount,
};
