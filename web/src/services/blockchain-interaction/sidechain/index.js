import clientFactory from './client-factory';
import CommonAPI from '../common';

// Client structure
//   client: {
//     account,
//     web3js,
//     loomClient
//     netId,
//     tokenContract,
//     gatewayContract,
//   }
let client;

class SidechainAPI {

  static async getClientHelper() {
    if (!client) {
      client = await clientFactory();
      console.log("SIDECHAIN CLIENT CREATED");
    }
    console.log("SIDECHAIN CLIENT", client);
    return client;
  };

  static async createDragon(gas) {
    return CommonAPI.sCreateDragonToken(SidechainAPI, gas)
      .then(res => res)
      .catch(err => err);
  }

  static async getMyDragons(gas) {
    return CommonAPI.sGetMyDragons(SidechainAPI, gas)
      .then(res => res)
      .catch(err => err);
  }

};

export default SidechainAPI;
