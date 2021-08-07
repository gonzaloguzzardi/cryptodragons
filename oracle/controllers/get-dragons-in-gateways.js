const { collection, database, mongoUrl } = require('../config');
const { collectEventsFromSidechainGateway, collectEventsFromMainchainGateway } = require('../mongo-utils');

const getDragonsFromSidechainGatewayPromise = () =>
  new Promise((res, rej) => {
    collectEventsFromSidechainGateway(database, mongoUrl, collection)
      .then((dragons) => {
        const result = dragons.map((dragon) => dragon.uid).reduce((acc, value) => [...acc, value], []);
        return res({ 'sidechain-gateway-results': result });
      })
      .catch((err) => rej(err));
  });

const getDragonsFromMainchainGatewayPromise = () =>
  new Promise((res, rej) => {
    collectEventsFromMainchainGateway(database, mongoUrl, collection)
      .then((dragons) => {
        const result = dragons.map((dragon) => dragon.uid).reduce((acc, value) => [...acc, value], []);
        return res({ 'mainchain-gateway-results': result });
      })
      .catch((err) => rej(err));
  });

function getDragonsInGateways(req, res) {
  const getDragonsFromSidechainGateway = getDragonsFromSidechainGatewayPromise();
  const getDragonsFromMainchainGateway = getDragonsFromMainchainGatewayPromise();

  Promise.all([getDragonsFromSidechainGateway, getDragonsFromMainchainGateway])
    .then((values) => res.status(200).send(values))
    .catch((err) => res.status(500).send(err));
}

module.exports = {
  getDragonsInGateways,
};
