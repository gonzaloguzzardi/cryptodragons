'use strict';

const config = require('./webpack.config.dev');

module.exports = {
    ...config,
    mode: 'production',
};