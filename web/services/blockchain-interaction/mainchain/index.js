/* eslint-disable no-undef */
import clientFactory from './client-factory'
import CommonAPI from '../common'
import sleep from '../../../utils/sleep'
import { GAS_DEFAULT_VALUE } from '../constants'

// client: { account, chainId } ... { tokenContract, gatewayContract, dragonFactoryContract }
let client
let clientFetching

const isNullOrEmpty = data => /^0x0{40}$/.test(data);

class MainchainAPI {
  static async getClientHelper() {
    while (!client && clientFetching) await sleep(1000);

    if (!client) {
      clientFetching = true;
      client = await clientFactory();
      clientFetching = false;
      console.log('MAINCHAIN CLIENT CREATED', client);
    }

    if (client) {
      ethereum.on('chainChanged', (chainId) => {
        console.log(`Blockchain changed to chainId: ${chainId}`);
        window.location.reload();
      })

      ethereum.on('accountsChanged', (accounts) => {
        console.log(`Account changed to: ${accounts[0]}`);
        window.location.reload();
      })
    }

    return client
  }

  static getAccountId() {
    return client && client.account;
  }

  static async connectToProvider() {
    await MainchainAPI.getClientHelper();

    if (!client) return Promise.resolve('Provider(ej: Metamask) not connected');

    return new Promise((res, rej) => {
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          console.log(`Account changed to: ${accounts[0]}`)
          client.account = accounts[0];
          return res(client);
        })
        .catch((err) => {
          if (err.code === 4001) return rej('EIP-1193 userRejectedRequest error.');
          if (err.code === -32002) return rej('Request already sent, check Provider');
          return rej(err);
        });
    });
  }

  static async areAccountsMapped(sideAccount, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper();

      return await CommonAPI.sAreAccountsMapped(contract, ownerAccount, sideAccount, gas);
    } catch (err) {
      console.error(err);
    }
  }

  static async createDragon(gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()
      return await CommonAPI.sCreateDragonToken(contract, ownerAccount, gas)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  static async getMyDragons(gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        dragonApiContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()
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
      } = await MainchainAPI.getClientHelper()

      return await CommonAPI.sTransferDragon(contract, ownerAccount, dragonId, gas)
    } catch (err) {
      console.error(err)
    }
  }

  static async transferDragonToNewOwner(dragonId, newOwner, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()

      console.log(`Transfer dragon from account: ${ownerAccount} to account: ${newOwner}`)
      const gasEstimate = await contract.methods
        .transferFrom(ownerAccount, newOwner, dragonId)
        .estimateGas({ from: ownerAccount, gas })
      console.log(`Gas estimated: ${gasEstimate}`)

      if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

      return await contract.methods
        .transferFrom(ownerAccount, newOwner, dragonId)
        .send({ from: ownerAccount, gas: gasEstimate })
    } catch (err) {
      throw new Error(err)
    }
  }

  static async mapAccountToSidechainAccount(sideAccount, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()

      console.log(`Map mainchain account: ${ownerAccount} with sidechain account: ${sideAccount}`)
      const gasEstimate = await contract.methods
        .mapContractToSidechain(sideAccount)
        .estimateGas({ from: ownerAccount, gas })
      console.log(`Gas estimated: ${gasEstimate}`)

      if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

      return await contract.methods
        .mapContractToSidechain(sideAccount)
        .send({ from: ownerAccount, gas: gasEstimate })
    } catch (err) {
      console.error(err)
    }
  }

  static async getDragonDataById(dragonId, gas = GAS_DEFAULT_VALUE) {
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

  static async getDragonVisualDataById(dragonId, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        dragonApiContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()

      return await CommonAPI.getDragonVisualDataById(dragonId, contract, ownerAccount, gas)
    } catch (err) {
      console.error(err)
    }
  }

  static async isApprovedForSelling(dragonId, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()

      console.log(`Get isApprovedForSelling for dragon id: ${dragonId}`)
      const gasEstimate = await contract.methods
        .getApproved(dragonId)
        .estimateGas({ from: ownerAccount, gas })
      console.log(`Gas estimated: ${gasEstimate}`)

      if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

      const dragonData = await contract.methods
        .getApproved(dragonId)
        .call({ from: ownerAccount, gas: gasEstimate })
        
      console.log(`Get isApprovedForSelling for dragon id: ${dragonId}, response: ${dragonData}`)
      return !isNullOrEmpty(dragonData)
    } catch (err) {
      console.error(err)
    }
  }

  static async approveSellDragon(dragonId, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        tokenContract: contract,
        marketplaceContract: marketplace,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()

      console.log(`approveSellDragon for dragon id: ${dragonId}`)
      const gasEstimate = await contract.methods
        .approve(marketplace._address,dragonId)
        .estimateGas({ from: ownerAccount, gas })
      console.log(`Gas estimated: ${gasEstimate}`)

      if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

      return await contract.methods
        .approve(marketplace._address,dragonId)
        .send({ from: ownerAccount, gas: gasEstimate })
    } catch (err) {
      console.error(err)
    }
  }
  
  static async createSellOrder(dragonId, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        marketplaceContract: contract,
        tokenContract: erc721Contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper()

      //TODO: check price here...
      const price = 1000;
      console.log("TODO: check price here...");

      console.log(`createSellOrder for dragon id: ${dragonId}`)
      const gasEstimate = await contract.methods
        .listToken(erc721Contract._address, dragonId, price)
        .estimateGas({ from: ownerAccount, gas })
      console.log(`Gas estimated: ${gasEstimate}`)

      if (gasEstimate >= gas) throw new Error('Not enough enough gas, send more.')

      return await contract.methods
        .listToken(erc721Contract._address, dragonId, price)
        .send({ from: ownerAccount, gas: gasEstimate })
    } catch (err) {
      console.error(err)
    }
  }

  // ADMIN functions
  static async getDragonsByPage(pageNumber = 1, pageSize = 10, gas = GAS_DEFAULT_VALUE) {
    try {
      const {
        dragonApiContract: contract,
        account: ownerAccount,
      } = await MainchainAPI.getClientHelper();

      return await CommonAPI.sGetDragonsByPage(contract, ownerAccount, pageNumber, pageSize, gas);
    } catch (err) {
      console.error(err);
    }
  }
}

export default MainchainAPI
