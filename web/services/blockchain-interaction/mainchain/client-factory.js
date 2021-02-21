/* eslint-disable no-undef */
// import Web3 from 'web3';
// const axios = require('axios');
// const bfaAddress = !process.env.DOCKERENV ? 'http://127.0.0.1:8545' : 'http://bfa:8545';
// const contractGetterApiUrl = !process.env.DOCKERENV ? 'http://localhost:8082' : 'http://contractGetter:8082';
// const web3js = new Web3(new Web3.providers.HttpProvider(bfaAddress));

// async function getMainNetTokenContract() {
//   const networkId = await web3js.eth.net.getId();
//   let MainchainDragonTokenJson = await axios.get(contractGetterApiUrl + '/api/contract?contract=MainnetTransferableDragon.json');
//   //const MainchainDragonTokenJson = require('../../../contracts/MainnetTransferableDragon.json');
//   MainchainDragonTokenJson = MainchainDragonTokenJson.data;
//   return new web3js.eth.Contract(MainchainDragonTokenJson.abi, MainchainDragonTokenJson.networks[networkId].address);
// }

// async function getMainNetGatewayContract() {
//   const networkId = await web3js.eth.net.getId();
//   var GatewayJson = await axios.get(contractGetterApiUrl + '/api/contract?contract=MainnetGateway.json');
//   GatewayJson = GatewayJson.data;
//   //const GatewayJson = require('../../../contracts/MainnetGateway.json');
//   console.log(GatewayJson);
// 	return new web3js.eth.Contract(GatewayJson.abi, GatewayJson.networks[networkId].address);
// }

import detectEthereumProvider from '@metamask/detect-provider'

export default async function clientFactory() {
  const provider = await detectEthereumProvider()

  if (!provider) {
    console.log('Provider(ej: Metamask) not found')
    return Promise.resolve(null)
  }

  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?')
  }

  return Promise.all([
    ethereum.request({ method: 'eth_accounts' }),
    ethereum.request({ method: 'eth_chainId' }),
  ])
    .then((values) => ({
      account: values[0][0],
      chainId: values[1],
    }))
    .catch((err) => console.error(err))
}
