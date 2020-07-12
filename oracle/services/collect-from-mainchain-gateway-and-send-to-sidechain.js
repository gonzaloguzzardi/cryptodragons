const { collection, database, mongoUrl } = require('../config');
const { collectEventsFromMainchainGateway } = require('../mongo-utils');

function transferDragonsToSide(dragons) {
  console.log('TODO: FINALIZE TRANSFER TO SIDE', dragons);
}

function collectFromMainchainGatewayAndSendToSidechain() {
  collectEventsFromMainchainGateway(database, mongoUrl, collection)
    .then((result) => {
      const dragons = result.map((event) => event.returnValues);
      if (dragons.length > 0) {
        transferDragonsToSide(dragons);
      }
    })
    .catch((err) => console.error(err));
}

module.exports = collectFromMainchainGatewayAndSendToSidechain;
