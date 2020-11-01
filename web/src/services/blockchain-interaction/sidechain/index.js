import clientFactory from './client-factory';
import CommonAPI from '../common';
import sleep from '../../../utils/sleep';

// client: { account, web3js, loomClient, netId, tokenContract, gatewayContract }
let client;
let clientFetching;

class SidechainAPI {

  static async getClientHelper() {
    while (!client && clientFetching) await sleep(1000);

    if (!client) {
      clientFetching = true;
      client = await clientFactory();
      clientFetching = false;
      console.log("SIDECHAIN CLIENT CREATED", client);
    }

    return client;
  };

  static async createDragon(gas) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount
      } = await SidechainAPI.getClientHelper();

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
      } = await SidechainAPI.getClientHelper();

      return await CommonAPI.sGetMyDragons(contract, ownerAccount, gas);
    } catch (err) {
      console.error(err);
    }
  }

  static async transferDragon(dragonId, gas) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount
      } = await SidechainAPI.getClientHelper();

      return await CommonAPI.sTransferDragon(contract, ownerAccount, dragonId, gas);
    } catch (err) {
      console.error(err);
    }
  }

  static async mapAccountToMainchainAccount(mainAccount, gas) {
    return SidechainAPI.getClientHelper().then(client => {
      const contract = client.tokenContract;
      const ownerAccount = client.account;

      console.log(`Map sidechain account: ${ownerAccount} with mainchain account: ${mainAccount}`);
      // const gasEstimate = await contract.methods
      //   mapContractToMainnet(mainAccount)
      //   .estimateGas({ from: ownerAccount, gas });

      // if (gasEstimate >= gas) { throw new Error('Not enough enough gas, send more.'); }
      const gasEstimate = gas || 350000;

      return contract.methods
        .mapContractToMainnet(mainAccount)
        .send({ from: ownerAccount, gas: gasEstimate })
        .then(res => res)
        .catch(err => console.error(err));
    }).catch(err => console.error(err));
  }

  static async areAccountsMapped(mainAccount, gas) {
    try {
      const {
        tokenContract: contract,
        account: ownerAccount
      } = await SidechainAPI.getClientHelper();

      return await CommonAPI.sAreAccountsMapped(contract, ownerAccount, mainAccount, gas);
    } catch (err) {
      console.error(err);
    }
  }

};

export default SidechainAPI;
