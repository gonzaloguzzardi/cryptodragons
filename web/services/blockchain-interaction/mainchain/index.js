import clientFactory from './client-factory'
import CommonAPI from '../common'
import sleep from '../../../utils/sleep'

// client: { account, netId, tokenContract, gatewayContract }
let client
let clientFetching

class MainchainAPI {
  static providerInstalled() {
    // eslint-disable-next-line no-undef
    return typeof window !== 'undefined' && window.ethereum
  }

  static async getClientHelper() {
    while (!client && clientFetching) await sleep(1000)

    if (!client) {
      clientFetching = true
      client = await clientFactory()
      clientFetching = false
      console.log('MAINCHAIN CLIENT CREATED', client)
      // client.web3js.eth.accounts.wallet.add(client.account);
    }

    return client
  }

  static async createDragon(gas) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()

      return await CommonAPI.sCreateDragonToken(contract, ownerAccount, gas)
    } catch (err) {
      console.error(err)
    }
  }

  static async getMyDragons(gas) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()

      return await CommonAPI.sGetMyDragons(contract, ownerAccount, gas)
    } catch (err) {
      console.error(err)
    }
  }

  static async transferDragon(dragonId, gas) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()

      return await CommonAPI.sTransferDragon(contract, ownerAccount, dragonId, gas)
    } catch (err) {
      console.error(err)
    }
  }

  static async mapAccountToSidechainAccount(sideAccount, gas) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()

      console.log(`Map mainchain account: ${ownerAccount} with sidechain account: ${sideAccount}`)

      const gasEstimate = await contract.methods
        .mapContractToSidechain(sideAccount)
        .estimateGas({ from: ownerAccount, gas })

      if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

      return await contract.methods
        .mapContractToSidechain(sideAccount)
        .send({ from: ownerAccount, gas: gasEstimate })
    } catch (err) {
      console.error(err)
    }
  }

  static async areAccountsMapped(sideAccount, gas) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()

      return await CommonAPI.sAreAccountsMapped(contract, ownerAccount, sideAccount, gas)
    } catch (err) {
      console.error(err)
    }
  }

  static async getDragonDataById(dragonId, gas) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()

      return await CommonAPI.getDragonDataById(dragonId, contract, ownerAccount, gas)
    } catch (err) {
      console.error(err)
    }
  }
}

export default MainchainAPI
