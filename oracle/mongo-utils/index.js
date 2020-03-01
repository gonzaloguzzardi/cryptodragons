const MongoClient = require('mongodb').MongoClient;

function collectEventsFromSidechainGateway(database, url, collection) {
	return _collectEvents('SendDragonToMainchainAttempt', database, url, collection);
}

function collectEventsFromMainchainGateway(database, url, collection) {
	return _collectEvents('SendDragonToSidechainAttempt', database, url, collection);
}

function collectEventsWithId(database, url, collection, an_id) {
	return new Promise((res, rej) => {
		MongoClient.connect(url, function (err, db) {
			if (err) return rej(err);
			var dbo = db.db(database);
			dbo.collection(collection).find({ id: { $eq: an_id } }).toArray(function(err, results) {
				db.close();
				if (err) return rej(err);
				return res(results);
			});
		});
	});
}

function _collectEvents(event, database, url, collection) {
	return new Promise((res, rej) => {
		MongoClient.connect(url, function (err, db) {
			if (err) return rej(err);
			var dbo = db.db(database);
			dbo.collection(collection).find({ event }).toArray(function(err, results) {
				db.close();
				if (err) return rej(err);
				return res(results);
			});
		});
	});
}

function insertOnMongo(database, url, transaction, collection) {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db(database);
		dbo.collection(collection).insertOne(transaction, function (err) {
			if (err) throw err;
			db.close();
		});
	});
	return transaction;
}

function deleteDragons(database,url,collection, dragons) {
	console.log(dragons);
	MongoClient.connect(url, function (err, db) {
		var dbo = db.db(database);
		for (let dragon of dragons) {
			console.log(dragon.uid);
			dbo.collection(collection).deleteOne({uid: dragon.uid}, function(err, result) {
				if (err) {
					console.log(err);
				}
				db.close();
			});
		}
	});

}

// @TODO: Repensar si esto es necesario, si queremos agregar algo más al evento
// 			Si no alteramos el evento podríamos mandarlo como viene, al mongo.
function transforEventIntoTransactionObj(event) {
	let transaction = {};
	transaction.event = event.event;
	
	transaction.uid = event.returnValues.uid;
	transaction.transactionHash = event.transactionHash;
	transaction.logIndex = event.logIndex;
	transaction.transactionIndex = event.transactionIndex;
	transaction.blockHash = event.blockHash;
	transaction.blockNumber = event.blockNumber;
	transaction.address = event.address;
	transaction.type = event.type;
	transaction.id = event.id;
	transaction.returnValues = event.returnValues;
	transaction.signature = event.signature;
	transaction.raw = event.raw;

	return transaction;
}

module.exports = {
	collectEventsFromSidechainGateway,
	collectEventsFromMainchainGateway,
	collectEventsWithId,
	insertOnMongo,
	deleteDragons,
    transforEventIntoTransactionObj,
};
