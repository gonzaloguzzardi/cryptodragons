/* eslint-disable no-undef */
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

const axios = require('axios');
const contractGetterApiUrl = !process.env.DOCKERENV ? 'http://localhost:8082' : 'http://contractGetter:8082';

async function getMainNetTokenContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  const { data: MainchainDragonTokenJson } = await axios.get(contractGetterApiUrl + '/api/contract/MainnetTransferableDragon.json');
  return new web3js.eth.Contract(
    MainchainDragonTokenJson.abi, MainchainDragonTokenJson.networks[networkId].address
  );
}

async function getMainNetGatewayContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  const { data: GatewayJson } = await axios.get(contractGetterApiUrl + '/api/contract/MainnetGateway.json');
  return new web3js.eth.Contract(GatewayJson.abi, GatewayJson.networks[networkId].address);
}

export default async function clientFactory() {
  if (!window) return Promise.resolve(null);

  const provider = await detectEthereumProvider();

  if (!provider) {
    console.log('Provider(ej: Metamask) not found');
    return Promise.resolve(null);
  }

  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }

  const web3js = new Web3(provider);

  const networkId = await web3js.eth.net.getId();
  console.log("Network id: " + networkId);
  if (networkId !== 12345) {
    alert("Connect to BFA mainnet with metamask");
    return Promise.resolve({});
  }

  return Promise.all([
    ethereum.request({ method: 'eth_accounts' }),
    ethereum.request({ method: 'eth_chainId' }),
    getMainNetTokenContract(web3js),
    getMainNetGatewayContract(web3js),
  ])
    .then((values) => ({
      account: values[0][0],
      chainId: values[1],
      tokenContract: values[2],
      gatewayContract: values[3],
    }))
    .catch((err) => console.error(err));
}
