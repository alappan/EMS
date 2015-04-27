var config = require('../config');

/*
  Register all Plugins and Services in the Server
*/

var plugins = [{
  register: require('hapi-swagger'),
  options: config.swaggerOptions
}, {
  register: require('../services/store')
}];

if (process.env.NODE_ENV === 'dev') {
  var good = {
    register: require('good'),
    options: config.goodOptions
  };
  plugins.push(good);
}

module.exports = plugins;