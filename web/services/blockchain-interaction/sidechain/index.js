import clientFactory from './client-factory'
import CommonAPI from '../common'
import { getSidechainData } from '../../oracle'
import sleep from '../../../utils/sleep'
import { GAS_DEFAULT_VALUE } from '../constants'

// client: { account, web3js, loomClient, netId, tokenContract, gatewayContract, dragonFactoryContract }
let client
let clientFetching

class SidechainAPI {
  static async getClientHelper() {
    while (!client && clientFetching) await sleep(1000)

    if (!client) {
      clientFetching = true
      client = await clientFactory()
      clientFetching = false
      console.log('SIDECHAIN CLIENT CREATED', client)
    }

    return client
  }

  // This is an apicall to Oracle, but it's Sidechain data so it goes here for now
  static async fetchSidechainData(mainchainAccountId) {
    return getSidechainData(mainchainAccountId)
      .then((res) => res)
      .catch((err) => console.error(err))
  }

  static async createDragon(gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await SidechainAPI.getClientHelper()
      return await CommonAPI.sCreateDragonToken(contract, ownerAccount, gas)
    } catch (err) {
      console.error(err)
    }
  }

  static async getMyDragons(gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await SidechainAPI.getClientHelper()

      return await CommonAPI.sGetMyDragons(contract, ownerAccount, gas)
    } catch (err) {
      console.error(err)
    }
  }

  static async transferDragon(dragonId, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await SidechainAPI.getClientHelper()

      return await CommonAPI.sTransferDragon(contract, ownerAccount, dragonId, gas)
    } catch (err) {
      console.error(err)
    }
  }

  static async mapAccountToMainchainAccount(mainAccount, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await SidechainAPI.getClientHelper()

      console.log(`Map sidechain account: ${ownerAccount} with mainchain account: ${mainAccount}`)

      const gasEstimate = await contract.methods
        .mapContractToMainnet(mainAccount)
        .estimateGas({ from: ownerAccount, gas })

      if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

      return await contract.methods
        .mapContractToMainnet(mainAccount)
        .send({ from: ownerAccount, gas: gasEstimate })
    } catch (err) {
      console.error(err)
    }
  }

  static async areAccountsMapped(mainAccount, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await SidechainAPI.getClientHelper()

      return await CommonAPI.sAreAccountsMapped(contract, ownerAccount, mainAccount, gas)
    } catch (err) {
      console.error(err)
    }
  }

  static async getDragonDataById(dragonId, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await SidechainAPI.getClientHelper()

      return await CommonAPI.getDragonDataById(dragonId, contract, ownerAccount, gas)
    } catch (err) {
      console.error(err)
    }
  }

  static async getDragonVisualDataById(dragonId, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await SidechainAPI.getClientHelper()

      return await CommonAPI.getDragonVisualDataById(dragonId, contract, ownerAccount, gas)
    } catch (err) {
      console.error(err)
    }
  }
  
  static async getGenerationAttributeFromBytes(genes, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        genesContract: contract,
        account: ownerAccount,
      } = await SidechainAPI.getClientHelper()

      return await CommonAPI.getGenerationAttributeFromBytes(genes, contract, ownerAccount, gas)
    } catch (err) {
      console.error(err)
    }
  }
}

export default SidechainAPI
