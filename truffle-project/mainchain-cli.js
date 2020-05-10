const Web3 = require('web3');
var Personal = require('web3-eth-personal');
const fs = require('fs');
const path = require('path');

// API SERVER
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');

const {
	isMap,
	mapAccount,
	createDragonToken,
	getMyDragons,
	getDragonDataById,
	transferDragonToGateway,
	receiveDragonFromOracle,
	saveDragonOnOracle,
	listenMainChainEvents,
} = require('./src/services/internal/mainchain');

// MAIN:
listenMainChainEvents();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200).send('Welcome to API REST');
});

function loadGanacheAccount(account) {
	const web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
	var ownerAccount = fs.readFileSync(path.join(__dirname, './misc/mainchain_account'), 'utf-8');
	if(account) {
		ownerAccount = account;
		console.log(account);
		web3js.eth.personal.unlockAccount(account,"asd", 15000);
	}
	console.log("ORIGINAL ACCOUNT: " + ownerAccount);
	web3js.eth.accounts.wallet.add(ownerAccount);
	return { account: ownerAccount, web3js };
}

async function giveSomeMoney(account) {
	const web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
	console.log('free money here');
	console.log(account);
	transactionObject = {
		from: '0x28863498efede12296888f7ca6cf0b94974fbdbc',
		to: account,
		value: '0x200000000000000000'
	};
	console.log(await web3js.eth.sendTransaction(transactionObject));
	console.log(await web3js.eth.getBalance(account));
	console.log(await web3js.eth.getBalance('0x28863498efede12296888f7ca6cf0b94974fbdbc'));
	
}

app.get('/api/account/create', async function createAccountFunction(req, res, next) {
	const web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
	var personal = new Personal(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
	const account = await web3js.eth.personal.newAccount("asd");
	web3js.eth.accounts.wallet.add(account);
	giveSomeMoney(account);
	res.status(200).send(account);
});

app.get('/api/dragon/create', async function createFunction(req, res, next) {
	const { account, web3js } = loadGanacheAccount(req.query.account);
	let hash = '';
	try {
		const tx = await createDragonToken(web3js, account, req.query.gas || 350000);
		console.log(`Dragon created`);
		console.log(`tx hash: ${tx.transactionHash}`);
		hash = tx.transactionHash;
		res.status(200).send(hash);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

app.post('/api/dragon/receive', async function transferFunction(req, res, next) {
	const { account, web3js } = loadGanacheAccount(req.query.account);
	let hash = '';
	let tx;
	try {
		for (const dragon of req.body.dragons) {
			console.log(`Awaiting receiveDragonFromOracle with dragon ${JSON.stringify(dragon, null, 2)}`);
			const receiverAddress = dragon.toMainchainAddress;
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
	const { account, web3js } = loadGanacheAccount(req.query.account);
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
	const { account, web3js } = loadGanacheAccount(req.query.account);
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
