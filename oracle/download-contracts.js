const axios = require('axios');
const axiosRetry = require('axios-retry');
const fs = require('fs');

const dir = './contracts';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const contractGetterApiUrl = !process.env.DOCKERENV ? 'http://localhost:8082' : 'http://contract-getter:8082';

function contractGetter(contract) {
  axiosRetry(axios, { retries: 100, retryDelay: axiosRetry.exponentialDelay });

  axios.get(`${contractGetterApiUrl}/api/contract/${contract}`).then((response) => {
    fs.writeFile(`${dir}/${contract}`, JSON.stringify(response.data, null, 2), (err) =>
      !err ? console.log(`creating: ${contract}`) : console.log(err),
    );
  });
}

contractGetter('DappchainTransferableDragon.json');
contractGetter('DappchainGateway.json');
contractGetter('MainnetGateway.json');
contractGetter('MainnetTransferableDragon.json');
contractGetter('DragonApi.json');
contractGetter('MainnetMarketplace.json');
contractGetter('MainnetDragonApi.json');
contractGetter('DragonLibrary.json');
contractGetter('DragonSerializer.json');
contractGetter('GenesLaboratory.json');
console.log(`dir: ${__dirname}`);
