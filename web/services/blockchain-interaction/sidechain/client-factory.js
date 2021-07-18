import Web3 from 'web3'
import MainchainAPI from '../mainchain'
import { getSidechainData } from '../../oracle'

import {
  Client,
  NonceTxMiddleware,
  SignedTxMiddleware,
  LocalAddress,
  CryptoUtils,
  LoomProvider,
} from 'loom-js'

const axios = require('axios');
const contractGetterApiUrl = !process.env.DOCKERENV ? 'http://localhost:8082' : 'http://contractGetter:8082';


const loomChainId = '13654820909954' // TODO ver si cambia o si es siempre el mismo

async function getLoomTokenContract(web3js) {
  const { data: DappchainDragonTokenJson } = await axios.get(contractGetterApiUrl + '/api/contract/DappchainTransferableDragon.json');
  return new web3js.eth.Contract(
    DappchainDragonTokenJson.abi,
    DappchainDragonTokenJson.networks[loomChainId].address
  )
}

async function getLoomGatewayContract(web3js) {
  const { data: GatewayJson } = await axios.get(contractGetterApiUrl + '/api/contract/DappchainGateway.json');
  return new web3js.eth.Contract(GatewayJson.abi, GatewayJson.networks[loomChainId].address)
}

async function loadLoomAccount(mainchainAccountId) {
  const { sidePrivateKey } = await getSidechainData(mainchainAccountId);
  const privateKey = CryptoUtils.B64ToUint8Array(sidePrivateKey)
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
  if (!window) return Promise.resolve(null);

  const {
    account: mainchainAccountId,
  } = await MainchainAPI.getClientHelper()
  return loadLoomAccount(mainchainAccountId)
    .then(({ account, web3js, client }) =>
      Promise.all([
        getLoomTokenContract(web3js),
        getLoomGatewayContract(web3js),
      ]).then(
        (values) => ({
          account,
          web3js,
          loomClient: client,
          netId: loomChainId,
          tokenContract: values[0],
          gatewayContract: values[1],
        })
      )
    )
    .catch((err) => console.error(err))
}
