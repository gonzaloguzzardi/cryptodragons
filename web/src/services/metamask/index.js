const getCurrentAccount = () => {
  return window.ethereum && window.ethereum.selectedAddress
};

const getNetworkID = () => {
  return window.ethereum && window.ethereum.networkVersion;
};

const loadMainchainAccount = setAddressCallback => {
  if (!window.ethereum) return alert("Metamask is not loaded!");

  window.ethereum.enable()
    .then(accounts => setAddressCallback(accounts[0]))
    .catch(err => {
      console.error(err);
      setAddressCallback(null)
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
