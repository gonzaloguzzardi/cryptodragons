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

export default async function clientFactory() {
  const provider = await detectEthereumProvider();

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
