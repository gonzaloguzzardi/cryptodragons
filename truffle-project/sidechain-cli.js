const { isMap } = require('./src/services/internal/sidechain');

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

app.post('/api/isMap', async function getIsMapFunction(req, res, next) {
	const { account, web3js, client } = loadLoomAccount(req.body.account);
	try {
		const result = await isMap(web3js, account, req.body.gas || 350000, req.body.mainAccount);
		res.status(200).send(result);
	} catch (err) {
		console.log(`Error mapping sidechain to mainchain ${err}`);
		res.status(400).send(err);
	} finally {
		if (client) client.disconnect();
	}
});
