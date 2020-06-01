/* eslint-disable prettier/prettier */
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// API SERVER
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
	listenMainChainEvents,
} = require('./src/services/internal/mainchain');
const { saveDragonOnOracle } = require('./src/services');

// MAIN:
listenMainChainEvents();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200).send('Welcome to API REST');
});

// -> MOVIDO
								function loadGanacheAccount() {
									// const privateKey = fs.readFileSync(path.join(__dirname, './ganache_private_key'), 'utf-8')
									// const ownerAccount = web3js.eth.accounts.privateKeyToAccount(privateKey)
									const bfaAddress = !process.env.DOCKERENV ? 'http://127.0.0.1:8545' : 'http://bfa:8545';
									const web3js = new Web3(new Web3.providers.HttpProvider(bfaAddress));
									const ownerAccount = fs.readFileSync(path.join(__dirname, './misc/mainchain_account'), 'utf-8');
									web3js.eth.accounts.wallet.add(ownerAccount);
									return { account: ownerAccount, web3js };
								}

								app.get('/api/dragon/create', async function createFunction(req, res, next) {
									const { account, web3js } = loadGanacheAccount();
									let hash = '';
									try {
										const tx = await createDragonToken(web3js, account, req.query.gas || 350000);
										console.log(`Dragon created`);
										console.log(`tx hash: ${tx.transactionHash}`);
										hash = tx.transactionHash;
										res.status(200).send(hash);
									} catch (err) {
										res.status(500).send(err);
									}
								});
// <- MOVIDO

app.post('/api/dragon/receive', async function transferFunction(req, res, next) {
	const { account, web3js } = loadGanacheAccount();
	let hash = '';
	let tx;
	try {
		for (const dragon of req.body.dragons) {
			console.log(`Awaiting receiveDragonFromOracle with dragon ${JSON.stringify(dragon, null, 2)}`);
			const receiverAddress = dragon.toMainchainAddress;
			tx = await receiveDragonFromOracle(
				web3js,
				account,
				req.query.gas || 450000,
				dragon.uid,
				dragon.data,
				receiverAddress,
			);
		}
		console.log(`tx hash: ${tx.transactionHash}`);
		console.log('MENSAJE RECIBIDO', req.body);
		hash = tx.transactionHash;
		res.status(200).send(hash);
	} catch (err) {
		saveDragonOnOracle(req.body.dragons);
		res.status(500).send(err);
	}
});

app.get('/api/dragon/transfer', async function transferToSideFunction(req, res, next) {
	const { account, web3js } = loadGanacheAccount();
	try {
		const data = await transferDragonToGateway(web3js, req.query.gas || 350000, account, req.query.id, req.query.data);
		console.log(`\n Token with id ${req.query.id} was successfully transfered to gateway \n`);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
	res.status(200).send(`Token with id ${req.query.id} was successfully transfered to gateway`);
});

app.get('/api/dragons', async function getDragonFunction(req, res, next) {
	const { account, web3js } = loadGanacheAccount();
	try {
		const data = await getMyDragons(web3js, account, req.query.gas || 350000);
		console.log(`\nAddress ${account} holds dragons with id ${data}\n`);

		// @TODO para probar. Sacar
		if (Array.isArray(data) && data.length > 0) {
			for (dragonId in data) {
				const dragonData = await getDragonDataById(web3js, account, dragonId);
				console.log(`\n Data for dragon with id ${dragonId}`);
				console.log(JSON.stringify(dragonData, null, 2));
			}
		}

		res.status(200).send(data);
	} catch (err) {
		console.log(`Error getting dragons data:${err}`);
		res.status(500).send(err);
	}
});

app.get('/api/dragon', async function getDragonFunction(req, res, next) {
	const { account, web3js } = loadGanacheAccount();
	try {
		const data = await getDragonDataById(web3js, account, req.query.id);
		data.sname = web3js.utils.toUtf8(data.name);
		res.status(200).send(data);
	} catch (err) {
		console.log(`Error getting dragon data with id: ${req.query.id}`);
		res.status(500).send(err);
	}
});

app.get('/api/mapAccount', async function getMapFunction(req, res, next) {
	const { account, web3js } = loadGanacheAccount(req.query.account);
	try {
		await mapAccount(web3js, account, req.query.gas || 350000, req.query.sideAccount);
		res.status(200).send('OK');
	} catch (err) {
		console.log(`Error mapping mainchain to sidechain ${err}`);
		res.status(400).send(err);
	}
});

const PORT = 8002;
http.createServer(app).listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});
