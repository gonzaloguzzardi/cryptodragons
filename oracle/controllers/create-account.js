const axios = require('axios');
const Web3 = require('web3');
const { sidechainApiUrl, sidechainApiPort, mainchainApiUrl, mainchainApiPort } = require('../config');
const { insertOnMongo, findAccounts } = require('../mongo-utils');
const { database, mongoUrl } = require('../config');

const { LocalAddress, CryptoUtils } = require('loom-js');

//async function giveSomeMoney(account) {
//  console.log("start giving some money...");
//  const web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
//  transactionObject = {
//    from: '0x28863498efede12296888f7ca6cf0b94974fbdbc',
//    to: account,
//    value: '0x200000000000000000'
//  };
//  console.log(await web3js.eth.sendTransaction(transactionObject));
//  console.log(await web3js.eth.getBalance(account));
//  console.log(await web3js.eth.getBalance('0x28863498efede12296888f7ca6cf0b94974fbdbc'));
//}


function getOrCreateSideAccount(req, res) {
  const mainAccount = req.query.account;
  const event = {
    mainAccount: mainAccount,
  };
  console.log(event);
  findAccounts(event, database, mongoUrl, 'accounts')
    .then((result) => {
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

        //giveSomeMoney(account.account);
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
