// IMPORTS
const cron = require('node-cron');
const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// CONSTANTS
const { oracleApiPort } = require('./config');

// CONTROLLERS
const { getDragonsInGateways, getOrCreateSideAccount } = require('./controllers');

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

// @TODO: Uncomment next line and delete mocked return value
// app.get('/api/getOrCreateSideAccount', getOrCreateSideAccount);
app.get('/api/getOrCreateSideAccount', (req, res) => {
  const account = {
    mainAccount: req.query.account,
    sidePrivateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
    sideAccount: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
    isFirst: true,
  };
  res.status(200).send(account);
});

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
