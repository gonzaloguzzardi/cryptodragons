/* eslint-disable no-undef */
import Web3 from 'web3'
const bfaAddress = !process.env.DOCKERENV ? 'http://127.0.0.1:8545' : 'http://bfa:8545'
const web3js = new Web3(new Web3.providers.HttpProvider(bfaAddress))

async function getMainNetTokenContract() {
  const networkId = await web3js.eth.net.getId()
  const MainchainDragonTokenJson = require('../../../contracts/MainnetTransferableDragon.json')
  return new web3js.eth.Contract(
    MainchainDragonTokenJson.abi,
    MainchainDragonTokenJson.networks[networkId].address
  )
}

async function getMainNetGatewayContract() {
  const networkId = await web3js.eth.net.getId()
  const GatewayJson = require('../../../contracts/MainnetGateway.json')
  return new web3js.eth.Contract(GatewayJson.abi, GatewayJson.networks[networkId].address)
}

export default async function clientFactory() {
  return Promise.all([
    web3js.eth.getAccounts(),
    web3js.eth.net.getId(),
    getMainNetTokenContract(),
    getMainNetGatewayContract(),
  ])
    .then((values) => ({
      web3js,
      account: values[0][0],
      accounts: values[0],
      netId: values[1],
      tokenContract: values[2],
      gatewayContract: values[3],
    }))
    .catch((err) => console.error(err))
}
