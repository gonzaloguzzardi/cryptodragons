const { collection, database, mongoUrl } = require('../config');
const { sideChainGatewayInstance } = require('./contracts-instances');
const { collectEventsFromMainchainGateway } = require('../mongo-utils');

function transferDragonsToSide(dragons) {
  console.log('TODO: FINALIZE TRANSFER TO SIDE', dragons);
  if (!!dragons && dragons.length > 0) {
    dragons.forEach((dragon) => {
      const senderAddress = '0xfee39fad945754831b59b92a1a8339f65358792d' || dragon.from;
      const receiverAddress = dragon.toSidechainAddress;
      const dragonId = dragon.uid;
      const dragonData = dragon.data;

      sideChainGatewayInstance.methods
        .receiveDragon(receiverAddress, dragonId, dragonData)
        .send({ from: senderAddress, gas: 35000 });
    });
  }
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
