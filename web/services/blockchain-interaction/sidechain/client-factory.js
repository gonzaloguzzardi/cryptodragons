import Web3 from 'web3'
import {
  Client,
  NonceTxMiddleware,
  SignedTxMiddleware,
  LocalAddress,
  CryptoUtils,
  LoomProvider,
} from 'loom-js'

const DappchainDragonTokenJson = require('../../../contracts/DappchainTransferableDragon.json')
const GatewayJson = require('../../../contracts/DappchainGateway')
const DragonFactoryJson = require('../../../contracts/DragonFactory.json')

const loomChainId = '13654820909954' // TODO ver si cambia o si es siempre el mismo

async function getLoomTokenContract(web3js) {
  return new web3js.eth.Contract(
    DappchainDragonTokenJson.abi,
    DappchainDragonTokenJson.networks[loomChainId].address
  )
}

async function getLoomGatewayContract(web3js) {
  return new web3js.eth.Contract(GatewayJson.abi, GatewayJson.networks[loomChainId].address)
}

async function getDragonFactoryContract(web3js) {
  console.log(DragonFactoryJson);
  return new web3js.eth.Contract(DragonFactoryJson.abi, DragonFactoryJson.networks[loomChainId].address)
}

async function loadLoomAccount() {
  // const accountPath = './misc/loom_private_key';
  // const privateKeyStr = fs.readFileSync(path.join(__dirname, accountPath), 'utf-8');
  const privateKeyStr =
    'OwM4hj6RcjBecJSrObLjyB4R/5dbQFk0ZpAyrIn7kYAFsuBAV7RoOIbw9V3tGB9I2WodYtN373D46UHn3EtgqQ=='
  const privateKey = CryptoUtils.B64ToUint8Array(privateKeyStr)
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
  const loomAddress = !process.env.DOCKERENV ? 'ws://127.0.0.1:46658' : 'ws://loom:46658'
  const client = new Client('default', `${loomAddress}/websocket`, `${loomAddress}/queryws`)
  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey),
  ]
  client.on('error', (msg) => {
    console.error('Loom connection error', msg)
  })

  return {
    account: LocalAddress.fromPublicKey(publicKey).toString(),
    web3js: new Web3(new LoomProvider(client, privateKey)),
    client,
  }
}

export default async function clientFactory() {
  return loadLoomAccount()
    .then(({ account, web3js, client }) =>
      Promise.all([getLoomTokenContract(web3js), getLoomGatewayContract(web3js)//, getDragonFactoryContract(web3js)
      ]).then(
        (values) => ({
          account,
          web3js,
          loomClient: client,
          netId: loomChainId,
          tokenContract: values[0],
          gatewayContract: values[1],
          //dragonFactoryContract: values[2],
        })
      )
    )
    .catch((err) => console.error(err))
}
