/* eslint-disable no-undef */
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

const axios = require('axios');
const contractGetterApiUrl = !process.env.DOCKERENV ? 'http://localhost:8082' : 'http://contractGetter:8082';

async function getMainNetTokenContract(web3js, networkId) {
  let MainchainDragonTokenJson = await axios.get(contractGetterApiUrl + '/api/contract/MainnetTransferableDragon.json');
  MainchainDragonTokenJson = DragonFactoryJson.data;
  return new web3js.eth.Contract(
    MainchainDragonTokenJson.abi, MainchainDragonTokenJson.networks[networkId].address
  );
}

async function getDragonFactoryContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  let DragonFactoryJson = await axios.get(contractGetterApiUrl + '/api/contract/DragonFactory.json');
  DragonFactoryJson = DragonFactoryJson.data;
  return new web3js.eth.Contract(DragonFactoryJson.abi, DragonFactoryJson.networks[networkId].address)
}

async function getMainNetGatewayContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  let GatewayJson = await axios.get(contractGetterApiUrl + '/api/contract/MainnetGateway.json');
  GatewayJson = DragonFactoryJson.data;
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

  const networkId = await web3js.eth.net.getId();
  if (networkId !== 12345) {
    alert("Connect to BFA mainnet with metamask");
    return Promise.resolve({});
  }

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
