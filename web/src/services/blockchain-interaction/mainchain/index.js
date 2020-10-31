import clientFactory from './client-factory';
import CommonAPI from '../common';
import sleep from '../../../utils/sleep';

// client: { web3js, account, netId, tokenContract, gatewayContract }
let client;
let clientFetching;

class MainchainAPI {

  static async getClientHelper() {
    while (!client && clientFetching) await sleep(1000);

    if (!client) {
      clientFetching = true;
      client = await clientFactory();
      clientFetching = false;
      console.log("MAINCHAIN CLIENT CREATED", client);
      // client.web3js.eth.accounts.wallet.add(client.account);
    }

    return client;
  };

  static async createDragon(gas) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount
      } = await MainchainAPI.getClientHelper();

      return await CommonAPI.sCreateDragonToken(contract, ownerAccount, gas);
    } catch (err) {
      console.error(err);
    }
  }

  static async getMyDragons(gas) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount
      } = await MainchainAPI.getClientHelper();

      return await CommonAPI.sGetMyDragons(contract, ownerAccount, gas);
    } catch (err) {
      console.error(err);
    }
  }

  static async transferDragon(dragonId, gas) {
    return CommonAPI.sTransferDragon(MainchainAPI, dragonId, gas)
      .then(res => res)
      .catch(err => err);
  }

  static async mapAccountToSidechainAccount(sideAccount, gas) {
    return MainchainAPI.getClientHelper().then(client => {
      const contract = client.tokenContract;
      const ownerAccount = client.account;

      console.log(`Map mainchain account: ${ownerAccount} with sidechain account: ${sideAccount}`);
      // const gasEstimate = await contract.methods
      //   .mapContractToSidechain(sideAccount)
      //   .estimateGas({ from: ownerAccount, gas });

      // if (gasEstimate >= gas) { throw new Error('Not enough enough gas, send more.'); }
      const gasEstimate = gas || 350000;

      return contract.methods
        .mapContractToSidechain(sideAccount)
        .send({ from: ownerAccount, gas: gasEstimate })
        .then(res => res)
        .catch(err => console.error(err));
    }).catch(err => console.error(err));
  }

  static async areAccountsMapped(sideAccount, gas) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount
      } = await MainchainAPI.getClientHelper();

      return await CommonAPI.sAreAccountsMapped(contract, ownerAccount, sideAccount, gas);
    } catch (err) {
      console.error(err);
    }
  }

};

export default MainchainAPI;
