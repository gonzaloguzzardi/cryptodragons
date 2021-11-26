// IMPORTS
const cron = require('node-cron');
const express = require('express');

const app = express();
const cors = require('cors');

// CONSTANTS
const { oracleApiPort, database, mongoUrl } = require('./config');
const { cleanCollection } = require('./mongo-utils');

// CONTROLLERS
const {
  getDragonsInGateways,
  getOrCreateSideAccount,
  giveSomeMoney,
  getSessionAdmin,
  postLoginAdmin,
} = require('./controllers');

// SERVICES
const {
  collectFromSidechainGatewayAndSendToMainchain,
  collectFromMainchainGatewayAndSendToSidechain,
  listenMainChainEvents,
  listenSideChainEvents,
} = require('./services');

// CUSTOM MIDDLEWARES
const { adminAuth } = require('./middlewares');

// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// LISTENING BLOCKCHAINS
listenMainChainEvents();
listenSideChainEvents();

// API ROUTES
app.get('/api/dragons', getDragonsInGateways);
app.get('/api/getOrCreateSideAccount', getOrCreateSideAccount);
app.get('/api/giveSomeMoney', giveSomeMoney);

cleanCollection(database, mongoUrl, 'accounts');

// ADMIN API ROUTES
app.get('/api/admin/session/test', adminAuth, getSessionAdmin);
app.post('/api/admin/login', postLoginAdmin);

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
