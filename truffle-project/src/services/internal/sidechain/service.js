const {
    _sMapAccount,
    _sCreateDragonToken,
    _sGetMyDragons,
    _sGetDragonDataById,
    _sTransferDragonToGateway,
    _sReceiveDragonFromOracle
  } = require('../../index.js');
const DappchainDragonTokenJson = require('../../../contracts/DappchainTransferableDragon.json');
const GatewayJson = require('../../../contracts/DappchainGateway');
const loomChainId = '13654820909954'; // TODO ver si cambia o si es siempre el mismo

async function getLoomTokenContract(web3js) {
    return new web3js.eth.Contract(
        DappchainDragonTokenJson.abi,
        DappchainDragonTokenJson.networks[loomChainId].address,
    )
}
  
async function getLoomGatewayContract(web3js) {
    return new web3js.eth.Contract(
      GatewayJson.abi,
      GatewayJson.networks[loomChainId].address
    )
}
  
  /*function createAccount(accountName) {
    if (!fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath)
    }
    const privateKey = CryptoUtils.generatePrivateKey();
    const buffer = new Buffer(privateKey);
    fs.writeFile(`${dirPath}/${accountName}`, buffer.toString('base64'), function(err) {
      if(err) {
        console.log("error creating account " + accountName);
        console.log(err.message)
      } else {
        console.log("Account " + accountName + " created with private key: " + privateKey.toString());
      }
    })
  }*/
  
async function mapAccount(web3js, ownerAccount, gas, mainAccount) {
    const contract = await getLoomTokenContract(web3js)
    return _sMapAccount(contract, ownerAccount, gas, mainAccount );
}
  
async function createDragonToken(web3js, ownerAccount, gas) {
    const contract = await getLoomTokenContract(web3js)
    return _sCreateDragonToken(contract,ownerAccount,gas);
}
  
async function getMyDragons(web3js, ownerAccount, gas) {
    const contract = await getLoomTokenContract(web3js)
    return _sGetMyDragons(contract,ownerAccount,gas);
}
  
async function getDragonDataById(web3js, ownerAccount, dragonId) {
    const contract = await getLoomTokenContract(web3js);
    return _sGetDragonDataById(contract, ownerAccount, dragonId );
}
  
async function transferDragonToGateway(web3js, gas, ownerAccount, dragonId) {
    const contract = await getLoomTokenContract(web3js)
    return _sTransferDragonToGateway(contract, gas, ownerAccount, dragonId);
}
  
async function receiveDragonFromOracle(web3js, ownerAccount, gas, dragonId, data, receiverAddress) {
    const contract = await getLoomGatewayContract(web3js);
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
