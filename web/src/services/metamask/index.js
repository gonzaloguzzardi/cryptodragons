const getCurrentAccount = () => {
	return window.ethereum && window.ethereum.selectedAddress
};

const getNetworkID = () => {
	return window.ethereum && window.ethereum.networkVersion;
};

const loadBFAAccount = (setAddressCallback) => {
	if (window.ethereum) {
		window.ethereum.enable()
			.then(accounts => setAddressCallback(accounts[0]))
			.catch(err => {
				console.error(err);
				setAddressCallback(null)
			});
	} else {
		alert("Metamask is not loaded!");
	};
};

const metamaskLoaded = () => {
	return (typeof window.ethereum !== 'undefined') && (window.ethereum.isMetaMask);
};

export {
	getCurrentAccount,
	getNetworkID,
	loadBFAAccount,
	metamaskLoaded,
};
