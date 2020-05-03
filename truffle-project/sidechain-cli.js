const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const { Client, NonceTxMiddleware, SignedTxMiddleware, LocalAddress, CryptoUtils, LoomProvider } = require('loom-js');
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const {
	mapAccount,
	createDragonToken,
	getMyDragons,
	getDragonDataById,
	transferDragonToGateway,
	receiveDragonFromOracle,
	saveDragonOnOracle,
	listenSideChainEvents,
} = require('./src/services/internal/sidechain');

function loadLoomAccount(accountName) {
	const accountPath = './misc/loom_private_key';
	const privateKeyStr = fs.readFileSync(path.join(__dirname, accountPath), 'utf-8');
	if (accountName) {
		console.log("using account: " + accountName);
		privateKeyStr = accountName;
	} 
	const privateKey = CryptoUtils.B64ToUint8Array(privateKeyStr);
	const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
	const client = new Client('default', 'ws://127.0.0.1:46658/websocket', 'ws://127.0.0.1:46658/queryws');
	client.txMiddleware = [new NonceTxMiddleware(publicKey, client), new SignedTxMiddleware(privateKey)];
	client.on('error', (msg) => {
		console.error('Loom connection error', msg);
	});

	return {
		account: LocalAddress.fromPublicKey(publicKey).toString(),
		web3js: new Web3(new LoomProvider(client, privateKey)),
		client,
	};
}

// MAIN:
listenSideChainEvents();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200).send('Welcome to API REST');
});

app.get('/api/account/create', async function createAccountFunction(req, res, next) {
	const privateKey = CryptoUtils.generatePrivateKey();
	const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
	res.status(200).send(LocalAddress.fromPublicKey(publicKey).toString());
});

app.get('/api/dragon/create', async function createFunction(req, res, next) {
	const { account, web3js, client } = loadLoomAccount(req.query.account);

	let hash = '';
	try {
		const tx = await createDragonToken(web3js, account, req.query.gas || 350000);
		console.log(`Dragon created, owner account:`, account);
		console.log(`tx hash: ${tx.transactionHash}`);
		hash = tx.transactionHash;
		res.status(200).send(hash);
	} catch (err) {
		res.status(400).send(err);
	} finally {
		if (client) client.disconnect();
	}
});

app.post('/api/dragon/receive', async function transferFunction(req, res, next) {
	const { account, web3js, client } = loadLoomAccount(req.query.account);
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

app.get('/api/dragons', async function getDragonFunction(req, res, next) {
	const { account, web3js, client } = loadLoomAccount(req.query.account);
	let data = '';
	try {
		data = await getMyDragons(web3js, account, req.query.gas || 350000);
		console.log(`\nAddress ${account} holds dragons with id ${data}\n`);
		res.status(200).send(data);
	} catch (err) {
		console.log(`Error getting dragons data:${err}`);
		res.status(500).send(err);
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

app.get('/api/dragon', async function getMapFunction(req, res, next) {
	// getDragonDataById(web3js, ownerAccount, dragonId) {
	const { account, web3js, client } = loadLoomAccount(req.query.account);
	try {
		const data = await getDragonDataById(web3js, account, req.query.id);
		data.sname = web3js.utils.toUtf8(data.name);
		res.status(200).send(data);
	} catch (err) {
		console.log(`Error getting dragon with id: ${req.id}`);
		res.status(400).send(err);
	} finally {
		if (client) client.disconnect();
	}
});

http.createServer(app).listen(8001, () => {
	console.log('Server started at http://localhost:8001');
});
