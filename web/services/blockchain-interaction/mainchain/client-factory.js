/* eslint-disable no-undef */
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

async function getMainNetTokenContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  const MainchainDragonTokenJson = require('../../../contracts/MainnetTransferableDragon.json');
  return new web3js.eth.Contract(
    MainchainDragonTokenJson.abi,
    MainchainDragonTokenJson.networks[networkId].address
  );
}

async function getDragonFactoryContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  const DragonFactoryJson = require('../../../contracts/DragonFactory.json');
  return new web3js.eth.Contract(DragonFactoryJson.abi, DragonFactoryJson.networks[networkId].address)
}

async function getMainNetGatewayContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  const GatewayJson = require('../../../contracts/MainnetGateway.json');
  return new web3js.eth.Contract(GatewayJson.abi, GatewayJson.networks[networkId].address);
}

async function giveSomeMoney(account) {
  const web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
  const transactionObject = {
    from: '0x28863498efede12296888f7ca6cf0b94974fbdbc',
    to: account,
    value: '0x200000000000000000'
  };
  console.log(await web3js.eth.sendTransaction(transactionObject));
  console.log(await web3js.eth.getBalance(account));
}

export default async function clientFactory() {
  const provider = await detectEthereumProvider();

  //giveSomeMoney("0x69058daD39F101e56FF6fB1f7B76DB209645FDfA");

  if (!provider) {
    console.log('Provider(ej: Metamask) not found');
    return Promise.resolve(null);
  }

  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }

  const web3js = new Web3(provider);

  return Promise.all([
    ethereum.request({ method: 'eth_accounts' }),
    ethereum.request({ method: 'eth_chainId' }),
    getMainNetTokenContract(web3js),
    getMainNetGatewayContract(web3js)
    //getDragonFactoryContract(web3js)
  ])
    .then((values) => ({
      account: values[0][0],
      chainId: values[1],
      tokenContract: values[2],
      gatewayContract: values[3]
      //dragonFactoryContract: values[4]
    }))
    .catch((err) => console.error(err));
}
