const Web3 = require('web3');

const { isMap } = require('./src/services/internal/mainchain');

async function giveSomeMoney(account) {
	const web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
	const transactionObject = {
		from: '0x28863498efede12296888f7ca6cf0b94974fbdbc',
		to: account,
		value: '0x200000000000000000',
	};
	console.log(await web3js.eth.sendTransaction(transactionObject));
	console.log(await web3js.eth.getBalance(account));
	console.log(await web3js.eth.getBalance('0x28863498efede12296888f7ca6cf0b94974fbdbc'));
}

app.get('/api/giveSomeMoney', async function freeMoney(req, res, next) {
	giveSomeMoney(req.query.account);
	res.status(200).send('OK');
});

app.get('/api/isMap', async function getisMapFunction(req, res, next) {
	const { account, web3js } = loadGanacheAccount(req.query.account);
	try {
		const result = await isMap(web3js, account, req.query.gas || 350000, req.query.sideAccount);
		res.status(200).send(result);
	} catch (err) {
		console.log(`Error mapping mainchain to sidechain ${err}`);
		res.status(400).send(err);
	}
});
