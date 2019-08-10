const cron = require("node-cron");
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sideNet', function (req, res) {
	console.log("OK");
	//res.sendStatus(200);
	res.status(200).send({ status:200, error: 'Something failed!' });	
});

var server = app.listen(8086, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Side Net listening at http://%s:%s", host, port)
})