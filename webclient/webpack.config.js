'use strict';

const TARGET = process.env.npm_lifecycle_event;
if (TARGET === 'build') {
  module.exports = require('./config/webpack.config.prod');
}
else if(TARGET === 'stats') {
  module.exports = require('./config/webpack.config.stats');
}
else {
  module.exports = require('./config/webpack.config.dev');
};
