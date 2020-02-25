function getDragonsInGateways(req, res) {
	// MongoClient.connect(url, function (err, db) {
	// 	if (err) throw err;
	// 	var dbo = db.db(database);
	// 	dbo.collection(collection).find({}).toArray(
	// 		function (err, result) {
	// 			if (err) throw err;
	// 			res.send(result);
	// 			console.log(result);
	// 			db.close();
	// 		}
	// 	)
	// });
    // res.send(sideList);
    res.send([]);
}

module.exports = {
    getDragonsInGateways,
};
