import Web3 from 'web3'

const {
  NonceTxMiddleware,
  SignedTxMiddleware,
  Client,
  LocalAddress,
  Address,
  CryptoUtils,
  LoomProvider
} = require('loom-js/dist')

import CardList from '../card_list'

export default class DAppChainCardManager {
  static async createAsync() {
    const privateKey = CryptoUtils.B64ToUint8Array(
      'ZGTsP8LUJkEWiqEZq3hqOKfCHCeV+CbYgbZK2/y53aDAaCJPBla4uLTsEtzm/Dczk8Ml8TL5+rAwKNfbuRZihg=='
    )

    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

    const client = new Client(
      'default',
      'ws://127.0.0.1:46658/websocket',
      'ws://127.0.0.1:46658/queryws'
    )

    // required middleware
    client.txMiddleware = [
      new NonceTxMiddleware(publicKey, client),
      new SignedTxMiddleware(privateKey)
    ]

    const from = LocalAddress.fromPublicKey(publicKey).toString()
    const web3 = new Web3(new LoomProvider(client, privateKey))

    const networkId = client.chainId

    client.on('error', msg => {
      console.error('Error on connect to client', msg)
      console.warn('Please verify if loom command is running')
    })

    const contract = new web3.eth.Contract(
      DC_CRYPTO_CARDS_JSON.abi,
      DC_CRYPTO_CARDS_JSON.networks[networkId].address,
      { from }
    )

    return new DAppChainCardManager(client, contract, web3)
  }

  constructor(client, contract, web3) {
    this._client = client
    this._contract = contract
    this._web3 = web3
  }

  getContractAddress() {
    return this._contract.options.address
  }

  getCardWithId(cardId) {
    return CardList[cardId]
  }

  async getBalanceOfUserAsync(address) {
    return await this._contract.methods.balanceOf(address).call({ from: address })
  }

  async getTokensCardsOfUserAsync(address, balance) {
    const total = await this._contract.methods.totalSupply().call()
    let ids = []
    for (let i = 0; i < total; i++) {
      if (i >= balance) {
        break
      }

      const cardId = await this._contract.methods
        .tokenOfOwnerByIndex(address, i)
        .call({ from: address })

      if (cardId !== 0) {
        ids.push(cardId)
      }
    }

    return ids
  }

  async approveAsync(address, cardId) {
    const addr = this._web3.utils.toChecksumAddress('0xC5d1847a03dA59407F27f8FE7981D240bff2dfD3')
    const iban = this._web3.eth.Iban.toIban(addr)
    return await this._contract.methods.approve(iban, cardId).send({ from: address })
  }
}
