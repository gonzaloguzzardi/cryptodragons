
const axios = require('axios');
var fs = require('fs');
var dir = './contracts';
const contractGetterApiUrl = !process.env.DOCKERENV ? 'http://localhost:8082' : 'http://contract-getter:8082';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

function contractGetter(contract) {
    axios.get(contractGetterApiUrl + '/api/contract?contract=' + contract).then(response => {
        fs.writeFile(dir + "/" + contract, JSON.stringify(response.data, null, 2), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("creating: " + contract);
        }); 
    });
}
  
contractGetter('DappchainTransferableDragon.json');
contractGetter('DappchainGateway.json');
contractGetter('MainnetGateway.json');
contractGetter('MainnetTransferableDragon.json');

console.log("dir: " + __dirname);