import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const getCurrentAccount = async () => {
  return web3.eth.getAccounts().then(accounts => accounts[0]);
};

const getNetworkID = async () => {
  return web3.eth.net.getId().then(netId => netId);
};

const loadMainchainAccount = setAddressCallback => {
  if (!window.ethereum) return alert("Metamask is not loaded!");

  window.ethereum.enable()
    .then(accounts => setAddressCallback(accounts[0]))
    .catch(err => {
      console.error(err);
      setAddressCallback(null);
    });
};

const onAccountChange = setAddressCallback => {
  if (!window.ethereum) return alert("Metamask is not loaded!");

  window.ethereum.on('accountsChanged', accounts => {
    setAddressCallback(accounts[0]);
  });
};

const metamaskLoaded = () => {
  return (typeof window.ethereum !== 'undefined') && (window.ethereum.isMetaMask);
};

export {
  getCurrentAccount,
  getNetworkID,
  loadMainchainAccount,
  metamaskLoaded,
  onAccountChange,
};
