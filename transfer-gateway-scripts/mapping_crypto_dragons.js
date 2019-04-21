const { readFileSync } = require('fs')
const Web3 = require('web3')

const {
  NonceTxMiddleware, SignedTxMiddleware, Client, Address, Contracts,
  LocalAddress, CryptoUtils, createJSONRPCClient, Web3Signer, soliditySha3
} = require('loom-js')

// toma el adrres de los crypto dragons, el de la dappchain y los hashes de los dragones...
//TODO: ver de tomar un solo archivo JSON que tenga todas las variables de una...
const cryptoDragonsAddress = readFileSync('crypto_dragons_address', 'utf-8')
const cryptoDragonsDAppChainAddress = readFileSync('crypto_dragons_dappchain_address', 'utf-8')
const cryptoDragonsTx = readFileSync('crypto_dragons_tx_hash', 'utf-8')

;(async () => {
  const privateKey = CryptoUtils.B64ToUint8Array(readFileSync('../truffle-dappchain/privateKey', 'utf-8'))
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

  const chainId  = 'default'
  const writeUrl = 'http://127.0.0.1:46658/rpc'
  const readUrl  = 'http://127.0.0.1:46658/query'

  const writer = createJSONRPCClient({ protocols: [{ url: writeUrl }] })
  const reader = createJSONRPCClient({ protocols: [{ url: readUrl }] })
  const client = new Client(chainId, writer, reader)

  console.log('Client created')

  // required middleware
  client.txMiddleware = [
    new NonceTxMiddleware(publicKey, client),
    new SignedTxMiddleware(privateKey)
  ]

  const transferGateway = await Contracts.TransferGateway.createAsync(
    client,
    new Address(client.chainId, LocalAddress.fromPublicKey(publicKey))
  )

  console.log('Transfer Gateway client created')

  const foreignContract = new Address('eth', LocalAddress.fromHexString(cryptoDragonsAddress))
  const localContract = new Address(
    client.chainId, LocalAddress.fromHexString(cryptoDragonsDAppChainAddress)
  )

  const web3 = new Web3('http://localhost:8545')
  const accounts = await web3.eth.getAccounts()
  const owner = accounts[0]

  console.log('Account used for sign', owner)

  const web3Signer = new Web3Signer(web3, owner)
  const hash = soliditySha3(
    { type: 'address', value: foreignContract.local.toString().slice(2) },
    { type: 'address', value: localContract.local.toString().slice(2) }
  )


  const foreignContractCreatorSig = await web3Signer.signAsync(hash)

  console.log(`Sign foreign contract and local contracts ${cryptoDragonsAddress} ${cryptoDragonsDAppChainAddress}`)

  const foreignContractCreatorTxHash = Buffer.from(cryptoDragonsTx.slice(2), 'hex')

  await transferGateway.addContractMappingAsync({
    foreignContract,
    localContract,
    foreignContractCreatorSig,
    foreignContractCreatorTxHash
  })
})()
