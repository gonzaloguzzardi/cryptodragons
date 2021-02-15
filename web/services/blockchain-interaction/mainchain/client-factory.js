/* eslint-disable no-undef */
import Web3 from 'web3'
import MainchainAPI from '.'

async function getMainNetTokenContract(web3js) {
  const networkId = await web3js.eth.net.getId()
  const MainchainDragonTokenJson = require('../../../contracts/MainnetTransferableDragon.json')
  return new web3js.eth.Contract(
    MainchainDragonTokenJson.abi,
    MainchainDragonTokenJson.networks[networkId].address
  )
}

async function getMainNetGatewayContract(web3js) {
  const networkId = await web3js.eth.net.getId()
  const GatewayJson = require('../../../contracts/MainnetGateway.json')
  return new web3js.eth.Contract(GatewayJson.abi, GatewayJson.networks[networkId].address)
}

export default async function clientFactory() {
  if (!MainchainAPI.providerInstalled()) return Promise.resolve(null)

  const web3js = new Web3(window.ethereum)

  return Promise.all([
    web3js.eth.getAccounts(),
    web3js.eth.net.getId(),
    getMainNetTokenContract(web3js),
    getMainNetGatewayContract(web3js),
  ])
    .then((values) => ({
      account: values[0][0],
      accounts: values[0],
      netId: values[1],
      tokenContract: values[2],
      gatewayContract: values[3],
    }))
    .catch((err) => console.error(err))
}
