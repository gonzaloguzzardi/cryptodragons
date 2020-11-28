// FUNCTIONS
const { deleteDragonFromMongo, insertDragonInMongo } = require('./common-actions');

// CONTRACTS INSTANCES
const { mainChainDragonsInstance, mainChainGatewayInstance } = require('./contracts-instances');

// MAIN
function listenMainChainEvents() {
  mainChainDragonsInstance.events.allEvents((err, event) => {
    if (err) console.err(err);
    if (event) {
      console.log('mainchainDragonsInstance', 'Evento ->', event.event);
      switch (event.event) {
        case 'NewDragon':
        case 'Approval':
        case 'ApprovalForAll':
        case 'OwnershipTransferred':
        case 'Transfer':
        default:
          console.log('Return values', JSON.stringify(event.returnValues, null, 2));
          break;
      }
    }
  });

  mainChainGatewayInstance.events.allEvents((err, event) => {
    if (err) console.error('Error on event', err);
    if (event) {
      console.log('mainchainGatewayInstance', 'Evento ->', event.event);
      switch (event.event) {
        case 'SendDragonToSidechainAttempt':
          insertDragonInMongo(event);
          break;
        case 'DragonSuccessfullyRetrievedInMainchain':
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
          console.log('Return values', JSON.stringify(event.returnValues, null, 2));
          break;
      }
    }
  });
}

module.exports = listenMainChainEvents;
