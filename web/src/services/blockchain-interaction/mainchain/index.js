import clientFactory from './client-factory';
import CommonAPI from '../common';

// Client structure
//   client: {
//     web3js,
//     account,
//     netId,
//     tokenContract,
//     gatewayContract,
//   }
let client;

class MainchainAPI {

  static async getClientHelper() {
    if (!client) {
      client = await clientFactory();
      console.log("MAINCHAIN CLIENT", client);
      // client.web3js.eth.accounts.wallet.add(client.account);
    }
    return client;
  };

  // static loadMainchainAccount() {
  //   if ((typeof window.ethereum === 'undefined') || !window.ethereum.isMetaMask) {
  //     return alert("Metamask is not loaded!");
  //   }
  //   window.ethereum.enable()
  //     .then(accounts => MainchainAPI.getClientHelper().then(client => client.account = accounts[0]))
  //     .catch(err => console.error(err));
  // };

  // static onAccountChange(setter) {
  //   window.ethereum && window.ethereum.on('accountsChanged', accounts => setter(accounts[0]));
  // }

  static async createDragon(gas) {
    return CommonAPI.sCreateDragonToken(MainchainAPI, gas)
      .then(res => res)
      .catch(err => err);
  }
};

export default MainchainAPI;
