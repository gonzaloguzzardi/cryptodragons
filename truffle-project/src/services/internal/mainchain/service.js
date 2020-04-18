const {
    _sMapAccountMainChain,
    _sCreateDragonToken,
    _sGetMyDragons,
    _sGetDragonDataById,
    _sTransferDragonToGateway,
    _sReceiveDragonFromOracle
  } = require('../../index.js');
const MainchainDragonTokenJson = require('../../../contracts/MainnetTransferableDragon.json')
const GatewayJson = require('../../../contracts/MainnetGateway.json');

async function getGanacheTokenContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  return new web3js.eth.Contract(
    MainchainDragonTokenJson.abi,
    MainchainDragonTokenJson.networks[networkId].address
  )
}

async function getGanacheGatewayContract(web3js) {
  const networkId = await web3js.eth.net.getId();
  return new web3js.eth.Contract(
    GatewayJson.abi,
    GatewayJson.networks[networkId].address
  )
}

async function mapAccount(web3js, ownerAccount, gas, sideAccount) {
  const contract = await getGanacheTokenContract(web3js)
  return _sMapAccountMainChain(contract,ownerAccount,gas, sideAccount);
}

async function createDragonToken(web3js, ownerAccount, gas) {
  const contract = await getGanacheTokenContract(web3js);
  return _sCreateDragonToken(contract,ownerAccount,gas);
}

async function getMyDragons(web3js, ownerAccount, gas) {
  const contract = await getGanacheTokenContract(web3js)
  return _sGetMyDragons(contract,ownerAccount,gas);
}

async function getDragonDataById(web3js, ownerAccount, dragonId, gas) {
  const contract = await getGanacheTokenContract(web3js)
  return _sGetDragonDataById(contract, ownerAccount, dragonId, gas);
}

async function transferDragonToGateway(web3js, gas, ownerAccount, dragonId) {
  const contract = await getGanacheTokenContract(web3js)
  return _sTransferDragonToGateway(contract, gas, ownerAccount, dragonId);
}

async function receiveDragonFromOracle(web3js, ownerAccount, gas, dragonId, data, receiverAddress) {
  const contract = await getGanacheGatewayContract(web3js);
  return _sReceiveDragonFromOracle(contract, ownerAccount, gas, dragonId, data, receiverAddress);
}

module.exports = {
    mapAccount,
    createDragonToken,
    getMyDragons,
    getDragonDataById,
    transferDragonToGateway,
    receiveDragonFromOracle
};
