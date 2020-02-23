const MongoClient = require('mongodb').MongoClient;

function insertOnMongo(database, url, transaction, collection) {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db(database);
		dbo.collection(collection).insertOne(transaction, function (err) {
			if (err) throw err;
			console.log("Transaction inserted on mongo", transaction);
			db.close();
		});
	});
	return transaction;
}

function transforEventIntoTransactionObj(event) {
	var transaction = new Object();
	transaction.id = event.returnValues.uid;
	transaction.data = event.raw.data;
	transaction.to = event.returnValues.toMainchainAddress;
	transaction.from = event.returnValues.from;
	transaction.type = event.event;
	return transaction
}

module.exports = {
    insertOnMongo,
    transforEventIntoTransactionObj,
};
