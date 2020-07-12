app.get('/api/account/create', async function createAccountFunction(req, res, next) {
	const privateKey = CryptoUtils.generatePrivateKey();
	const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
	const account = LocalAddress.fromPublicKey(publicKey).toString();
	const r = {
		private: CryptoUtils.Uint8ArrayToB64(privateKey),
		account,
	};
	res.status(200).send(r);
});
