const Web3 = require('web3');
const path = require('path');
const fs = require('fs');

const { NonceTxMiddleware, SignedTxMiddleware, Client, CryptoUtils, LoomProvider } = require('loom-js');

// CONSTANTS
const {
  MainchainDragonContract,
  MainChainGatewayContract,
  BFA_SOCKET_CONNECTION,
  BFA_NETWORK_ID,
  CHAIN_ID,
  WRITE_URL,
  READ_URL,
  SidechainDragonContract,
  SidechainGatewayContract,
} = require('../config');

// MAINCHAIN CONTRACTS
const web3MainChain = new Web3(new Web3.providers.WebsocketProvider(BFA_SOCKET_CONNECTION));
const ownerAccount = fs.readFileSync(path.join(__dirname, '../misc/', 'mainchain_account'), 'utf-8');
//web3MainChain.eth.accounts.wallet.add(ownerAccount);

const MainChainGatewayABI = MainChainGatewayContract.abi;
const MainchainDragonABI = MainchainDragonContract.abi;

if (!MainChainGatewayContract.networks) {
  throw Error('Contract not deployed on Mainchain');
}

const mainChainDragonsInstance = new web3MainChain.eth.Contract(
  MainchainDragonABI,
  MainchainDragonContract.networks[BFA_NETWORK_ID].address,
);

const mainChainGatewayInstance = new web3MainChain.eth.Contract(
  MainChainGatewayABI,
  MainChainGatewayContract.networks[BFA_NETWORK_ID].address,
);

// SIDECHAIN CONTRACTS
const privateKeyStr = fs.readFileSync(path.join(__dirname, '../misc/', 'loom_private_key'), 'utf-8');
const privateKey = CryptoUtils.B64ToUint8Array(privateKeyStr);
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
const client = new Client(CHAIN_ID, WRITE_URL, READ_URL);

client.txMiddleware = [new NonceTxMiddleware(publicKey, client), new SignedTxMiddleware(privateKey)];
client.on('error', (msg) => {
  console.error('Loom connection error', msg);
});

const web3SideChain = new Web3(new LoomProvider(client, privateKey));
const SideChainDragonABI = SidechainDragonContract.abi;
const SideChainGatewayABI = SidechainGatewayContract.abi;

if (!SidechainDragonContract.networks) {
  throw Error('Dragons contract not deployed on DAppChain');
}

if (!SidechainGatewayContract.networks) {
  throw Error('Sidechain Gateway contract not deployed on DAppChain');
}

const sideChainDragonsInstance = new web3SideChain.eth.Contract(
  SideChainDragonABI,
  SidechainDragonContract.networks['13654820909954'].address,
);

const sideChainGatewayInstance = new web3SideChain.eth.Contract(
  SideChainGatewayABI,
  SidechainGatewayContract.networks['13654820909954'].address,
);

// EXPORTS
module.exports = {
  mainChainDragonsInstance,
  mainChainGatewayInstance,

  sideChainDragonsInstance,
  sideChainGatewayInstance,
};
