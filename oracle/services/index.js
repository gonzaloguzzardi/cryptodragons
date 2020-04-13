const collectFromSidechainGatewayAndSendToMainchain = require('./collect-from-sidechain-gateway-and-send-to-mainchain');
const collectFromMainchainGatewayAndSendToSidechain = require('./collect-from-mainchain-gateway-and-send-to-sidechain');

const listenSideChainEvents = require('./listen-sidechain-events');
const listenMainChainEvents = require('./listen-mainchain-events');
const {
    insertDragon,
    deleteADragon
} = require('./commonActions');

module.exports = {
    collectFromSidechainGatewayAndSendToMainchain,
    collectFromMainchainGatewayAndSendToSidechain,
	deleteADragon,
	insertDragon,
    listenSideChainEvents,
    listenMainChainEvents,
};
