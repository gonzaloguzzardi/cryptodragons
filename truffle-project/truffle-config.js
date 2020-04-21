// @format
const { readFileSync } = require('fs');
const path = require('path');
const { join } = require('path');
const LoomTruffleProvider = require('loom-truffle-provider');
const HDWalletProvider = require('truffle-hdwallet-provider');
const { sha256 } = require('js-sha256');
const { CryptoUtils } = require('loom-js');
const { mnemonicToSeedSync } = require('bip39');
const fs = require('fs');
const PrivateKeyProvider = require('truffle-privatekey-provider');

function getLoomProviderWithPrivateKey(privateKeyPath, chainId, writeUrl, readUrl) {
	const privateKey = readFileSync(privateKeyPath, 'utf-8');
	return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey);
}

function getLoomProviderWithMnemonic(mnemonicPath, chainId, writeUrl, readUrl) {
	const mnemonic = readFileSync(mnemonicPath, 'utf-8').toString().trim();
	const seed = mnemonicToSeedSync(mnemonic);
	const privateKeyUint8ArrayFromSeed = CryptoUtils.generatePrivateKeyFromSeed(new Uint8Array(sha256.array(seed)));
	const privateKeyB64 = CryptoUtils.Uint8ArrayToB64(privateKeyUint8ArrayFromSeed);
	return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKeyB64);
}

module.exports = {
	contracts_build_directory: join(__dirname, './src/contracts'),
	compilers: {
		solc: {
			version: '^0.5.0',
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	networks: {
		loom_dapp_chain: {
			provider() {
				const chainId = 'default';
				const writeUrl = `http://${process.env.SIDECHAIN_URL}:46658/rpc`;
				const readUrl = `http://${process.env.SIDECHAIN_URL}:46658/query`;
				const privateKeyPath = path.join(__dirname, 'misc', 'loom_private_key');
				const mnemonicPath = path.join(__dirname, 'misc', 'loom_mnemonic');
				if (fs.existsSync(privateKeyPath)) {
					const loomTruffleProvider = getLoomProviderWithPrivateKey(privateKeyPath, chainId, writeUrl, readUrl);
					loomTruffleProvider.createExtraAccountsFromMnemonic(
						'gravity top burden flip student usage spell purchase hundred improve check genre',
						10,
					);
					return loomTruffleProvider;
				}
				if (fs.existsSync(mnemonicPath)) {
					const loomTruffleProvider = getLoomProviderWithMnemonic(mnemonicPath, chainId, writeUrl, readUrl);
					return loomTruffleProvider;
				}
			},
			network_id: '*',
		},
		loom_mainnet: {
			provider() {
				const chainId = 'default';
				const writeUrl = 'http://plasma.dappchains.com/rpc';
				const readUrl = 'http://plasma.dappchains.com/query';
				const mnemonicPath = path.join(__dirname, 'mainnet_mnemonic');
				const privateKeyPath = path.join(__dirname, 'mainnet_private_key');
				if (fs.existsSync(privateKeyPath)) {
					const loomTruffleProvider = getLoomProviderWithPrivateKey(privateKeyPath, chainId, writeUrl, readUrl);
					return loomTruffleProvider;
				}
				if (fs.existsSync(mnemonicPath)) {
					const loomTruffleProvider = getLoomProviderWithMnemonic(mnemonicPath, chainId, writeUrl, readUrl);
					return loomTruffleProvider;
				}
			},
			network_id: '*',
		},
		bfa: {
			provider() {
				// ESTE IP TIENE QUE SER EL MISMO QUE EL QUE TIENE BFA PARA QUE ANDE
				// SI NO ANDA TENES QUE PONER EL NUEVO Y REBUILDEAR LA IMAGEN DOCKER
				// DE mainchain-deploy-and-cli
				// POR QUE SINO ESTE ARCHIVO NO SE ACTUALIZA
				// TAMBIEN HAY QUE USAR ESTE IP EN MAINCHAIN CLI PARA CONECTARSE
				const urlKeyProvider = `http://192.168.16.2:8545`;
				// create provider using the private key of the prefunded bfa account 0x28863498efede12296888f7ca6cf0b94974fbdbc
				return new PrivateKeyProvider(
					'dff874fa1f53c713f31b5831c25fe56657808bd0b379a7f28442af8a6de79cb2',
					urlKeyProvider,
				);
			},
			network_id: '12345',
			host: `192.168.16.2`,
			port: 8545,
			gas: 4727597,
			from: '0x28863498efede12296888f7ca6cf0b94974fbdbc',
		},
	},
};
