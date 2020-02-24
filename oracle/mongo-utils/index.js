const MongoClient = require('mongodb').MongoClient;

function collectEventsFromSidechainGateway(database, url, collection) {
	return _collectEvents('SendDragonToMainchainAttempt', database, url, collection);
}

function _collectEvents(event, database, url, collection) {
	return new Promise((res) => {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db(database);
			dbo.collection(collection).find({ event }).toArray(function(err, results) {
				db.close();
				if (err) throw err;
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

// @TODO: Repensar si esto es necesario, si queremos agregar algo más al evento
// 			Si no alteramos el evento podríamos mandarlo como viene, al mongo.
function transforEventIntoTransactionObj(event) {
	let transaction = {};
	transaction.event = event.event;

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
    insertOnMongo,
    transforEventIntoTransactionObj,
};
