import helperFactory from './helper-factory';

// Helper structure
//   helper: {
//     account,
//     netId,
//   }
let helper;
class MetamaskHelper {

  static async getMetamaskHelper() {
    if (!helper) {
      helper = await helperFactory();
    }
    return helper;
  };
  
  static loadMainchainAccount() {
    if ((typeof window.ethereum === 'undefined') || !window.ethereum.isMetaMask) {
      return alert("Metamask is not loaded!");
    }
    window.ethereum.enable()
      .then(accounts => MetamaskHelper.getMetamaskHelper().then(helper => helper.account = accounts[0]))
      .catch(err => console.error(err));
  };

  static onAccountChange(setter) {
    window.ethereum && window.ethereum.on('accountsChanged', accounts => setter(accounts[0]));
  }
};

export default MetamaskHelper;
