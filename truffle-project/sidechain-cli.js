const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const {
	isMap,
	mapAccount,
	transferDragonToGateway,
	receiveDragonFromOracle,
} = require('./src/services/internal/sidechain');
const { saveDragonOnOracle } = require('./src/services');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200).send('Welcome to API REST');
});

app.post('/api/dragon/receive', async function transferFunction(req, res, next) {
	const { account, web3js, client } = loadLoomAccount();
	let hash = '';
	let tx;
	try {
		for (const dragon of req.body.dragons) {
			console.log(`Awaiting receiveDragonFromOracle with dragon ${JSON.stringify(dragon, null, 2)}`);
			const receiverAddress = dragon.toSidechainAddress;
			tx = await receiveDragonFromOracle(
				web3js,
				account,
				req.query.gas || 350000,
				dragon.uid,
				dragon.data,
				receiverAddress,
			);
		}
		console.log(`tx hash: ${tx.transactionHash}`);
		console.log('MENSAJE RECIBIDO', req.body.dragons);
		hash = tx.transactionHash;
		res.status(200).send(hash);
	} catch (err) {
		saveDragonOnOracle(req.body.dragons);
		res.status(500).send(err);
	} finally {
		if (client) client.disconnect();
	}
});

app.get('/api/dragon/transfer', async function transferFunction(req, res, next) {
	const { account, web3js, client } = loadLoomAccount(req.query.account);
	try {
		const data = await transferDragonToGateway(web3js, req.query.gas || 350000, account, req.query.id);
		console.log(`\n Token with id ${req.query.id} was successfully transfered to gateway \n`);
		res.status(200).send(`Token with id ${req.query.id} was successfully transfered to gateway`);
	} catch (err) {
		res.status(400).send(err);
	} finally {
		if (client) client.disconnect();
	}
});

app.get('/api/mapAccount', async function getMapFunction(req, res, next) {
	const { account, web3js, client } = loadLoomAccount(req.query.account);
	try {
		await mapAccount(web3js, account, req.query.gas || 350000, req.query.mainAccount);
		res.status(200).send('OK');
	} catch (err) {
		console.log(`Error mapping sidechain to mainchain ${err}`);
		res.status(400).send(err);
	} finally {
		if (client) client.disconnect();
	}
});

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
		var result = await isMap(web3js, account, req.body.gas || 350000, req.body.mainAccount);
		res.status(200).send(result);
	} catch (err) {
		console.log(`Error mapping sidechain to mainchain ${err}`);
		res.status(400).send(err);
	} finally {
		if (client) client.disconnect();
	}
});

http.createServer(app).listen(8001, () => {
	console.log('Server started at http://localhost:8001');
});
