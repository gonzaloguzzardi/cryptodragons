const keythereum = require('keythereum');
const async = require('async');
const datadir = './devnet/network/node';

var keyObject = keythereum.importFromFile("0x28863498efede12296888f7ca6cf0b94974fbdbc", datadir);
var privateKey = keythereum.recover("", keyObject);
console.log(privateKey.toString('hex'));