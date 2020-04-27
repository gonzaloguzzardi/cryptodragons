// IMPORTS
const cron = require('node-cron');
const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// CONSTANTS
const { oracleApiPort } = require('./config');

// CONTROLLERS
const {
	getDragonsInGateways,
	transferDragon,
	mapAccounts,
	saveDragon,
	getDragon,
	deleteDragon,
	insertDragon,
} = require('./controllers');

// SERVICES
const {
	collectFromSidechainGatewayAndSendToMainchain,
	collectFromMainchainGatewayAndSendToSidechain,
} = require('./services');

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API ROUTES
app.get('/api/dragons', getDragonsInGateways);
app.get('/api/dragon/transfer', transferDragon);
app.get('/api/mapAccounts', mapAccounts);
app.get('/api/dragon', getDragon);

app.post('/api/saveDragon', saveDragon);
app.post('/api/deleteDragon', deleteDragon);
app.post('/api/insertDragon', insertDragon);

// SERVER LISTEN
const server = app.listen(oracleApiPort, () => {
	const { address, port } = server.address();
	console.log('Example app listening at http://%s:%s', address, port);
});

// CRON
cron.schedule('*/15 * * * * *', () => {
	collectFromSidechainGatewayAndSendToMainchain();
	collectFromMainchainGatewayAndSendToSidechain();
});
