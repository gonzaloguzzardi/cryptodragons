'use strict';

const webpack = require('webpack')
const cryptoCardsJSON = require('../../truffle-ethereum/build/contracts/TransferableDragon.json')
const dcCryptoCardsJSON = require('../../truffle-dappchain/build/contracts/TransferableDragon.json')
// const gameTokenJSON = require('../../truffle-ethereum/build/contracts/GameToken.json')
// const dcGameTokenJSON = require('../../truffle-dappchain/build/contracts/GameTokenDappChain.json')
// const dcSimpleStakeJSON = require('../../truffle-dappchain/build/contracts/SimpleStake.json')
const gatewayDappchainJSON = require('../../truffle-dappchain/build/contracts/Gateway.json')
const gatewayJSON = require('../../truffle-ethereum/build/contracts/Gateway.json')

console.log('PASAA');
console.log('PASAA');
console.log('PASAA');
console.log('PASAA');
console.log('PASAA');
console.log('PASAA');

module.exports = {
  context: __dirname + '/../src',
  mode: 'development',
  entry: ['regenerator-runtime/runtime', './index'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  node: {
    fs: 'empty',
    child_process: 'empty',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      CRYPTO_CARDS_JSON: JSON.stringify(cryptoCardsJSON),
      DC_CRYPTO_CARDS_JSON: JSON.stringify(dcCryptoCardsJSON),
      // GAME_TOKEN_JSON: JSON.stringify(gameTokenJSON),
      // DC_GAME_TOKEN_JSON: JSON.stringify(dcGameTokenJSON),
      // DC_SIMPLE_STAKE: JSON.stringify(dcSimpleStakeJSON),
      GATEWAY_JSON: JSON.stringify(gatewayJSON),
    }),
  ],
  optimization: {
    minimizer: [],
  },
};
