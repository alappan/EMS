require("dotenv").load();

var Hapi = require('hapi');
var config = require('./config');
var bole = require('bole');
var log = require('bole')('Server');
var mongoDB = require('./adapters/store');

bole.output({
  level: 'info',
  stream: process.stdout
});

var server = new Hapi.Server(config.settings);

server.connection(config.connection.http);

/**
  desc : Start Server
  @params: cb, provided returns the registerd the server object
  @returns: {object}
*/
function startServer(cb) {

  var plugins = require('./adapters/plugins');

  server.register(plugins, function(err) {
    if (err) {
      throw err;
    }

    mongoDB.init(config.store);

    if (!module.parent) {
      server.start(function() {
        log.info('Server Started @ : ' + server.info.uri);
      });
    }
    if (cb) {
      cb(server);
    }
  });
}

/**
  Check for the Invocation as Module / Command line Execution
*/

if (!module.parent) {
  startServer();
}

module.exports = startServer;
