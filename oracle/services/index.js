const collectFromSidechainGatewayAndSendToMainchain = require('./collect-from-sidechain-gateway-and-send-to-mainchain');
const collectFromMainchainGatewayAndSendToSidechain = require('./collect-from-mainchain-gateway-and-send-to-sidechain');

const {
    insertDragonInMongo,
    deleteDragonFromMongo
} = require('./common-actions');

module.exports = {
    collectFromSidechainGatewayAndSendToMainchain,
    collectFromMainchainGatewayAndSendToSidechain,
	deleteDragonFromMongo,
	insertDragonInMongo,
};
