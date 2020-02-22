// IMPORTS
const cron = require("node-cron");
const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");

// CONSTANTS
const { API_PORT } = require('./config');

// CONTROLLERS
const {
	getDragonsInSidechainGateway,
} = require('./controllers');

// SERVICES
const {
	collectFromSidechainGatewayAndSendToMainchain,
	collectFromMainchainGatewayAndSendToSidechain,
	listenSideChainEvents,
	listenMainChainEvents,
} = require('./services');

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MAIN
listenSideChainEvents();
listenMainChainEvents();

// API ROUTES
app.get('/api/dragons/sidechain-gateway', getDragonsInSidechainGateway);

// SERVER LISTEN
const server = app.listen(API_PORT, '0.0.0.0', function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port);
});

// CRON
cron.schedule("*/15 * * * * *", () => {
	collectFromSidechainGatewayAndSendToMainchain();
	collectFromMainchainGatewayAndSendToSidechain();
});
