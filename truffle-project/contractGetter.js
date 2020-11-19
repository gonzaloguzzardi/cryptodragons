const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//requiring path and fs modules
const path = require('path');
const fs = require('fs');


function getAbailableContracts(req, res) {
    fs.readdir('./src/contracts', function (err, files) {
        if (err) {
            res.status(500).send('Unable to scan directory: ' + err);
        } 
        res.status(200).send(files);
    });
}

function getContentOfContract(req, res) {
    const filePath = path.join('./src/contracts', req.query.contract);
    console.log(filePath);
    console.log(filePath);
    fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
            res.status(500).send('Unable to get data: ' + err);
        }
        res.status(200).send(data);
    });
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/contracts', getAbailableContracts);
app.get('/api/contract', getContentOfContract);

// SERVER LISTEN
const server = app.listen(8082, () => {
    const { address, port } = server.address();
    console.log('Example app listening at http://%s:%s', address, port);
  });
  