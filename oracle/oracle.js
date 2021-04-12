// IMPORTS
const cron = require('node-cron');
const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// CONSTANTS
const { oracleApiPort, database, mongoUrl } = require('./config');
const { cleanCollection } = require('./mongo-utils');
// CONTROLLERS
const { getDragonsInGateways, getOrCreateSideAccount, giveSomeMoney } = require('./controllers');

// SERVICES
const {
  collectFromSidechainGatewayAndSendToMainchain,
  collectFromMainchainGatewayAndSendToSidechain,
  listenMainChainEvents,
  listenSideChainEvents,
} = require('./services');

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// LISTENING BLOCKCHAINS
listenMainChainEvents();
listenSideChainEvents();

// API ROUTES
app.get('/api/dragons', getDragonsInGateways);
app.get('/api/getOrCreateSideAccount', getOrCreateSideAccount);
app.get('/api/giveSomeMoney', giveSomeMoney);

cleanCollection(database, mongoUrl, 'accounts');

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
