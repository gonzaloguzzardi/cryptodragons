const cron = require("node-cron");
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

var i = 1;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/mainNet', function (req, res) {
	i++;
	if(i % 2){
		console.log("OK");
		//res.sendStatus(200);
		res.status(200).send({ status:200, error: 'Something failed!' });
	}
	else{
		sleep(10000).then(() => {
			console.log("ERROR");
			res.status(500).send({ status:500, error: 'Something failed!' });
			//res.sendStatus(500);
		});
	}
});

function sleep(millis) {
	return new Promise(resolve => setTimeout(resolve, millis));
}

var server = app.listen(8085, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Main Net listening at http://%s:%s", host, port)
})