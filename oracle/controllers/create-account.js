const Web3 = require('web3');
const { insertOnMongo, findAccounts } = require('../mongo-utils');
const { database, mongoUrl } = require('../config');
const {  Client, LocalAddress, CryptoUtils, NonceTxMiddleware, SignedTxMiddleware, LoomProvider } = require('loom-js');
const {
  MainchainDragonContract,
  BFA_SOCKET_CONNECTION,
  BFA_NETWORK_ID,
  CHAIN_ID,
  WRITE_URL,
  READ_URL,
  SidechainDragonContract
} = require('../config');

//IE: http://localhost:8081/api/getOrCreateSideAccount?account=0x69058daD39F101e56FF6fB1f7B76DB209645FDfA

async function giveSomeMoney(req, res) {
  const account = req.query.account;
  console.log("start giving some money...");
  const web3js = new Web3(new Web3.providers.WebsocketProvider(BFA_SOCKET_CONNECTION));
  transactionObject = {
    from: '0x28863498efede12296888f7ca6cf0b94974fbdbc',
    to: account,
    value: '0x200000000000000000'
  };
  console.log(await web3js.eth.sendTransaction(transactionObject));
  console.log(await web3js.eth.getBalance(account));
  console.log(await web3js.eth.getBalance('0x28863498efede12296888f7ca6cf0b94974fbdbc'));
  res.status(200).send("Free Money! :)");
}


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
            mapAccounts(account.sideAccount, account.sidePrivateKey,account.mainAccount);
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
  console.log(`Map account: ${ownerAccount} with main account: ${sideAccount}`);
  const gasEstimate = await contract.methods.mapContractToSidechain(sideAccount).estimateGas({ from: ownerAccount, gas });
  if (gasEstimate >= gas) {
    throw new Error('Not enough enough gas, send more.');
  }
  console.log("sending mapping...");
  return contract.methods.mapContractToSidechain(sideAccount).send({ from: ownerAccount, gas: gasEstimate });
}

async function mapAccountSideChain(contract, ownerAccount, gas, mainAccount) {
	console.log(`Map account: ${ownerAccount} with main account: ${mainAccount}`);
	const gasEstimate = await contract.methods.mapContractToMainnet(mainAccount).estimateGas({ from: ownerAccount, gas });
	if (gasEstimate >= gas) {
		throw new Error('Not enough enough gas, send more.');
  }
  console.log("sending mapping...");
	return contract.methods.mapContractToMainnet(mainAccount).send({ from: ownerAccount, gas: gasEstimate });
}

async function mapAccounts(sideAccount, sidePrivateKeyStr, mainAccount) {
  //SIDE WEB3 CONFIG
  const privateKey = CryptoUtils.B64ToUint8Array(sidePrivateKeyStr);
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
  const client = new Client(CHAIN_ID, WRITE_URL, READ_URL);
  client.txMiddleware = [new NonceTxMiddleware(publicKey, client), new SignedTxMiddleware(privateKey)];
  client.on('error', (msg) => {
    console.error('Loom connection error', msg);
  });
  const web3SideChain = new Web3(new LoomProvider(client, privateKey));
  const SideChainDragonABI = SidechainDragonContract.abi;
  if (!SidechainDragonContract.networks) {
    throw Error('Dragons contract not deployed on DAppChain');
  }
  const sideChainDragonsInstance = new web3SideChain.eth.Contract(
    SideChainDragonABI,
    SidechainDragonContract.networks['13654820909954'].address,
  );

  //MAIN WEB3 CONFIG
  //const web3MainChain = new Web3(new Web3.providers.WebsocketProvider(BFA_SOCKET_CONNECTION));
  //const MainChainDragonABI = MainchainDragonContract.abi;
  //if (!MainchainDragonContract.networks) {
  //  throw Error('Contract not deployed on Mainchain');
  //}
  //const mainChainDragonsInstance = new web3MainChain.eth.Contract(
  //  MainChainDragonABI,
  //  MainchainDragonContract.networks[BFA_NETWORK_ID].address,
  //);

  //MAPPING ACCOUNTS:
  await mapAccountSideChain(sideChainDragonsInstance, sideAccount, 350000, mainAccount);
  //const mainMap = await mapAccountMainChain(mainChainDragonsInstance, "0x28863498efede12296888f7ca6cf0b94974fbdbc", 350000, sideAccount);//this works
  //const mainMap = await mapAccountMainChain(mainChainDragonsInstance, mainAccount, 350000, sideAccount);//this is not working
}

module.exports = {
  getOrCreateSideAccount,
  giveSomeMoney
};
