const { MongoClient } = require('mongodb');

const mongoClientOptions = { useUnifiedTopology: true, useNewUrlParser: true };

function collectEvents(event, database, url, collection) {
  return new Promise((res, rej) => {
    MongoClient.connect(url, mongoClientOptions, (err, db) => {
      if (err) return rej(err);
      const dbo = db.db(database);
      dbo
        .collection(collection)
        .find({ event })
        .toArray((error, results) => {
          db.close();
          if (error) return rej(error);
          return res(results);
        });
      return null;
    });
  });
}

function collectEventsFromSidechainGateway(database, url, collection) {
  return collectEvents('SendDragonToMainchainAttempt', database, url, collection);
}

function collectEventsFromMainchainGateway(database, url, collection) {
  return collectEvents('SendDragonToSidechainAttempt', database, url, collection);
}

function insertOnMongo(database, url, transaction, collection) {
  return new Promise((res, rej) => {
    MongoClient.connect(url, mongoClientOptions, (err, db) => {
      if (err) throw err;
      const dbo = db.db(database);
      dbo.collection(collection).insertOne(transaction, (error) => {
        db.close();
        if (error) return rej(error);
        return res('OK');
      });
    });
  });
}

function deleteDragon(database, url, collection, dragon) {
  return new Promise((res, rej) => {
    MongoClient.connect(url, mongoClientOptions, (err, db) => {
      const dbo = db.db(database);
      dbo.collection(collection).deleteOne({ uid: dragon.uid }, (error, result) => {
        db.close();
        if (error) return rej(error);
        return res(result);
      });
    });
  });
}

// @TODO: Repensar si esto es necesario, si queremos agregar algo más al evento
// 			Si no alteramos el evento podríamos mandarlo como viene, al mongo.
function transforEventIntoTransactionObj(event) {
  const transaction = {};
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
  collectEvents,
  collectEventsFromSidechainGateway,
  collectEventsFromMainchainGateway,
  insertOnMongo,
  deleteDragon,
  transforEventIntoTransactionObj,
};
