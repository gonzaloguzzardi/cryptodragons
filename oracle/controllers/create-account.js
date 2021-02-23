const axios = require('axios');
const { sidechainApiUrl, sidechainApiPort, mainchainApiUrl, mainchainApiPort } = require('../config');
const { insertOnMongo, findAccounts } = require('../mongo-utils');
const { database, mongoUrl } = require('../config');

const { LocalAddress, CryptoUtils } = require('loom-js');

function giveSomeMoney(account) {
  axios.get(`${mainchainApiUrl}:${mainchainApiPort}/api/giveSomeMoney?account=${account}`);
}

function getOrCreateSideAccount(req, res) {
  const mainAccount = req.query.account;
  const event = {
    mainAccount: mainAccount,
  };
  console.log(event);
  findAccounts(event, database, mongoUrl, 'accounts')
    .then((result) => {
      console.log(result);
      if (result.length > 0) {
        result[0].isFirst = false;
        res.status(200).send(result[0]);
      } else {
        const account = createLoomAccount(mainAccount);
        insertOnMongo(database, mongoUrl, account, 'accounts')
          .then(() => {
            account.isFirst = true;
            res.status(200).send(account);
          })
          .catch((err) => res.status(500).send(err));

        //giveSomeMoney(mainAccount);
      }
    })
    .catch((err) => res.status(500).send(err));
}

function createLoomAccount(mainAccount) {
  const privateKey = CryptoUtils.generatePrivateKey();
  const privateKeyString = CryptoUtils.Uint8ArrayToB64(privateKey)
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
  const account = LocalAddress.fromPublicKey(publicKey).toString()
  const result = {
    mainAccount: mainAccount,
    sidePrivateKey: privateKeyString,
    //sidePublicKey: publicKey,
    sideAccount: account,
  };
  return result;
}

module.exports = {
  getOrCreateSideAccount,
};
