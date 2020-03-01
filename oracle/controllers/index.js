const request = require('request');

const {
	sidechainApiPort,sidechainApiUrl,
	mainchainApiPort,mainchainApiUrl,
	collection, database, mongoUrl
} = require('../config');
const { 
	collectEventsFromSidechainGateway, 
	collectEventsFromMainchainGateway,
	collectEventsWithId,
} = require('../mongo-utils');

const getDragonsFromSidechainGateway = new Promise((res, rej) => {
	collectEventsFromSidechainGateway(database, mongoUrl, collection)
		.then(result => res({ 'sidechain-gateway-results': result }))
		.catch(err => rej(err));
});

const getDragonsFromMainchainGateway = new Promise((res, rej) => {
	collectEventsFromMainchainGateway(database, mongoUrl, collection)
		.then(result => res({ 'mainchain-gateway-results': result }))
		.catch(err => rej(err));
});

function getDragonWithId(id) {
	new Promise((res, rej) => {
		collectEventsWithId(database, mongoUrl, collection, id)
			.then(result => res({ 'result': result }))
			.catch(err => rej(err));
	});
}

function getDragonsInGateways(req, res) {
	Promise.all([ getDragonsFromSidechainGateway, getDragonsFromMainchainGateway ])
		.then(
			values => {
				result = [];
				result.concat(values[0]['sidechain-gateway-results'])
				result.concat(values[1]['mainchain-gateway-results'])
				res.status(200).send(result)
			})
		.catch(err => res.status(500).send(err));
}

function transferDragon (req, res) {
	console.log("aca res: " + req);
	if (req.query.toMain) {
		request.get(
			{
				headers: { 'content-type': 'application/json' },
				url: `${sidechainApiUrl}:${sidechainApiPort}/api/dragon/transfer?id=` + req.query.id,
				json: true,
			},
			function (error, response, body) {
				res.status(200).send(response);
			}
		);
	} else {
		request.get(
			{
				headers: { 'content-type': 'application/json' },
				url: `${mainchainApiUrl}:${mainchainApiPort}/api/dragon/transfer?id=` + req.query.id,
				json: true,
			},
			function (error, response, body) {
				res.status(200).send(response);
			}
		);
	}
}


function reciveDragon(req, res) {
	console.log("entro al transfer oracle...");
	_dragonId = req.id;
	console.log(_dragonId);
	Promise.all([ getDragonWithId(3) ])
		.then(result => {
			console.log(result);
			console.log("pasa por aqui...");
			res({ 'result': result });
			//console.log("aca hay algo... " + result);
			//if (req.toMain) {
			//	transferFromSideToMain = dragonId => (
			//		axios.get(`${sidechainurl}:${sidechainApiPort}/api/dragon/transfer`, {
			//			params: { id: _dragonId, data: _data },
			//		})
			//	);	
			//} else {
			//	transferFromMainToSide = dragonId => (
			//		axios.get(`${mainchainUrl}:${mainchainApiPort}/api/dragon/transfer`, {
			//			params: { id: _dragonId, data: _data },
			//		})
			//	);
			//
			//}
		}).catch(err => {
			console.log("aca no hay nada...");
			console.log(err);
			rej(err);
		});
	
}

module.exports = {
	getDragonsInGateways,
	transferDragon,
};
