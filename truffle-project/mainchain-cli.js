const Web3 = require('web3')
const program = require('commander')
const fs = require('fs')
const path = require('path')

const MainchainDragonTokenJson = require('./src/contracts/MainnetTransferableDragon.json')

async function getGanacheTokenContract(web3js) {
  const networkId = await web3js.eth.net.getId()
  return new web3js.eth.Contract(
    MainchainDragonTokenJson.abi,
    MainchainDragonTokenJson.networks[networkId].address
  )
}

function loadGanacheAccount() {
  const privateKey = fs.readFileSync(path.join(__dirname, './ganache_private_key'), 'utf-8')
  const web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
  const ownerAccount = web3js.eth.accounts.privateKeyToAccount(privateKey)
  web3js.eth.accounts.wallet.add(ownerAccount)
  return { account: ownerAccount, web3js }
}

async function createDragonToken(web3js, ownerAccount, gas) {
  const contract = await getGanacheTokenContract(web3js);
  
  const gasEstimate = await contract.methods
    .createDragon("test dragon", 1, 2, 2)
    .estimateGas({ from: ownerAccount['address'], gas: 35000 })
    //.estimateGas({ from: ownerAccount, gas: 35000 })
    
  if (gasEstimate == gas) {
    throw new Error('Not enough enough gas, send more.')
  }
  return contract.methods
    .createDragon("test dragon", 1, 2, 2)
    .send({ from: ownerAccount['address'], gas: 35000 })
    //.send({ from: ownerAccount, gas: 35000 })
}

async function getMyDragons(web3js, ownerAccount, gas) {
  const contract = await getGanacheTokenContract(web3js)
  return await contract.methods
    .getDragonsIdsByOwner(ownerAccount)
    .call({ from: ownerAccount, gas });
}

program
  .command('create-dragon')
  .description('Create test dragon')
  .option("-g, --gas <number>", "Gas for the tx")
  .option("-a, --account <accountName>", "File countaining private key of the account to use for this transaction")
  .action(async function() {
    const { account, web3js } = loadGanacheAccount()
    try {
      const tx = await createDragonToken(web3js, account, 350000)
      console.log(`Dragon created`)
      console.log(`tx hash: ${tx.transactionHash}`)
    } catch (err) {
      console.error(err)
    }
  })

program
  .command('my-dragons')
  .description('Create test dragon')
  .option("-g, --gas <number>", "Gas for the tx")
  .option("-a, --account <accountName>", "File countaining private key of the account to use for this transaction")
  .action(async function() {
    const { account, web3js } = loadGanacheAccount()
    try {
      const data = await getMyDragons(web3js, account, 350000)
      console.log(`\nAddress ${account} holds dragons with id ${data}\n`) 
    } catch (err) {
      console.error(err)
    }
  })


program
  .version('0.1.0')
  .parse(process.argv)
