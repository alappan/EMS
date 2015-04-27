var mongoose = require('mongoose');
var log = require('bole')('Store');

module.exports = {
  init: function(options) {
    mongoose.connect(options.uri);

    mongoose.connection.on('connected', function() {
      log.info('Connected MongoStore');
    });

    mongoose.connection.on('disconnected', function() {
      log.info('Disconnected MongoStore');
    });

    mongoose.connection.on('error', function(err) {
      throw err;
    });
  }
};
