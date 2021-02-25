const Web3 = require('web3');
const { BFA_CONNECTION, WRITE_URL, READ_URL} = require('../config');
const { insertOnMongo, findAccounts } = require('../mongo-utils');
const { database, mongoUrl } = require('../config');
const {  Client, LocalAddress, CryptoUtils, NonceTxMiddleware, SignedTxMiddleware, LoomProvider } = require('loom-js');

//IE: http://localhost:8081/api/getOrCreateSideAccount?account=0x69058daD39F101e56FF6fB1f7B76DB209645FDfA

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
  findAccounts(event, database, mongoUrl, 'accounts')
    .then((result) => {
      if (result.length > 0) {
        result[0].isFirst = false;
        res.status(200).send(result[0]);
      } else {
        createLoomAccount(mainAccount).then(
          (account) => {
            insertOnMongo(database, mongoUrl, account, 'accounts')
            .then(() => {
              account.isFirst = true;
              res.status(200).send(account);
            })
            .catch((err) => res.status(500).send(err));

            //giveSomeMoney(account.account);
            //mapAccounts(account.sideAccount, account.sidePrivateKey,account.mainAccount);
          }
        )
      }
    })
    .catch((err) => res.status(500).send(err));
}

async function createLoomAccount(mainAccount) {

  //const privateKeyStr = "OwM4hj6RcjBecJSrObLjyB4R/5dbQFk0ZpAyrIn7kYAFsuBAV7RoOIbw9V3tGB9I2WodYtN373D46UHn3EtgqQ==";
  //const privateKey = CryptoUtils.B64ToUint8Array(privateKeyStr);
  //const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
  //const client = new Client('default', WRITE_URL, READ_URL);
  //client.txMiddleware = [
  //  new NonceTxMiddleware(publicKey,client),
  //  new SignedTxMiddleware(privateKey)
  //]
  //const account = LocalAddress.fromPublicKey(publicKey).toString();
  //var web3 = new Web3(new LoomProvider(client, privateKey));
  //const newAccount = await web3.eth.accounts.create();
  //console.log(newAccount);
  //return result = {
  //  mainAccount: mainAccount,
  //  sidePrivateKey: newAccount.privateKey,
  //  //sidePublicKey: publicKey,
  //  sideAccount: newAccount.address,
  //};

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

async function mapAccountMainChain(contract, ownerAccount, gas, sideAccount) {
  console.log("entra aqui");
  //console.log(contract);
  console.log(contract.methods);
  const gasEstimate = await contract.methods
  .mapContractToSidechain(sideAccount)
  .estimateGas({ from: ownerAccount, gas });
  if (gasEstimate >= gas) {
    console.log("error");
    throw new Error('Not enough enough gas, send more.');
  }
  return contract.methods.mapContractToSidechain(sideAccount).send({ from: ownerAccount, gas: gasEstimate });
}

async function mapAccountSideChain(contract, ownerAccount, gas, mainAccount) {
	console.log(`Map account: ${ownerAccount} with main account: ${mainAccount}`);

	const gasEstimate = await contract.methods.mapContractToMainnet(mainAccount).estimateGas({ from: ownerAccount, gas });

	if (gasEstimate >= gas) {
		throw new Error('Not enough enough gas, send more.');
	}
	return contract.methods.mapContractToMainnet(mainAccount).send({ from: ownerAccount, gas: gasEstimate });
}

async function mapAccounts(sideAccount, sidePrivateKeyStr, mainAccount) {
  const client = new Client('default', WRITE_URL, READ_URL);
  
  console.log(sidePrivateKeyStr);
  console.log(CryptoUtils.B64ToUint8Array(sidePrivateKeyStr));
  var sideWeb3 = new Web3(new LoomProvider(client, CryptoUtils.B64ToUint8Array(sidePrivateKeyStr)));
  var mainWeb3 = new Web3(new Web3.providers.HttpProvider(BFA_CONNECTION));

  const mainMap = await mapAccountMainChain(mainWeb3, mainAccount, 350000, sideAccount);
  const sideMAp = await mapAccountSideChain(sideWeb3, sideAccount, 350000, mainAccount);
}

module.exports = {
  getOrCreateSideAccount,
};
