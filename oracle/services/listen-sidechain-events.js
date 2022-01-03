// FUNCTIONS
const { deleteDragonFromMongo, insertDragonInMongo } = require('./common-actions');

// CONTRACTS INSTANCES
const { sideChainDragonsInstance, sideChainGatewayInstance } = require('./contracts-instances');

// MAIN
function listenSideChainEvents() {
  sideChainDragonsInstance.events.allEvents((err, event) => {
    if (err) console.error(err);
    if (event) {
      console.log('sideChainDragonsInstance', 'EVENTO ->', event.event);
      switch (event.event) {
        case 'NewDragon':
        case 'Approval':
        case 'ApprovalForAll':
        case 'OwnershipTransferred':
        case 'Transfer':
        default:
          console.log(JSON.stringify(event.returnValues, null, 2));
          break;
      }
    }
  });

  sideChainGatewayInstance.events.allEvents((err, event) => {
    if (err) console.error(err);
    if (event) {
      console.log('sideChainGatewayInstance', 'Evento de sidechain ->', event.event);
      switch (event.event) {
        case 'SendDragonToMainchainAttempt':
          insertDragonInMongo(event);
          break;
        case 'DragonSuccessfullyRetrievedInSidechain':
          console.log('BORRANDO ESTE', event.returnValues);
          deleteDragonFromMongo(event);
          break;
        case 'AddedValidator':
        case 'ERC20Received':
        case 'ERC721Received':
        case 'ETHReceived':
        case 'OwnershipTransferred':
        case 'RemovedValidator':
        case 'TokenWithdrawn':
        default:
          console.log(JSON.stringify(event.returnValues, null, 2));
          break;
      }
    }
  });
}

module.exports = listenSideChainEvents;
