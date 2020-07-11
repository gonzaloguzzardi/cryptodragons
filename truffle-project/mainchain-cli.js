/* eslint-disable prettier/prettier */
const Web3 = require('web3');

// API SERVER
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
} = require('./src/services/internal/mainchain');
const { saveDragonOnOracle } = require('./src/services');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200).send('Welcome to API REST');
});

async function giveSomeMoney(account) {
	const web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
	const transactionObject = {
		from: '0x28863498efede12296888f7ca6cf0b94974fbdbc',
		to: account,
		value: '0x200000000000000000'
	};
	console.log(await web3js.eth.sendTransaction(transactionObject));
	console.log(await web3js.eth.getBalance(account));
	console.log(await web3js.eth.getBalance('0x28863498efede12296888f7ca6cf0b94974fbdbc'));
}

app.get('/api/giveSomeMoney', async function freeMoney(req, res, next) {
	giveSomeMoney(req.query.account);
	res.status(200).send("OK");
});

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
		res.status(200).send(`Token with id ${req.query.id} was successfully transfered to gateway, data: ${data}`);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
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

app.get('/api/isMap', async function getisMapFunction(req, res, next) {
	const { account, web3js } = loadGanacheAccount(req.query.account);
	try {
		var result = await isMap(web3js, account, req.query.gas || 350000, req.query.sideAccount);
		res.status(200).send(result);
	} catch (err) {
		console.log(`Error mapping mainchain to sidechain ${err}`);
		res.status(400).send(err);
	}
});

const PORT = 8002;
http.createServer(app).listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});
