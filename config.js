var config = module.exports = {};


config.connection = {};

config.host = '0.0.0.0';
config.HTTPPORT = process.env.HTTPPORT || 15443;

/**
 * Http Connection Settings
 */
config.connection.http = {
  host: config.host,
  port: config.HTTPPORT
};

/**
 * HAPI Server Settings
 */
config.settings = {
  connections: {
    routes: {
      cors: true
    }
  }
};

/**
 * Logging Good Options
 */
config.goodOptions = {
  reporters: [{
    reporter: require('good-console'),
    args: [{
      log: '*',
      response: '*'
    }]
  }]
};

/**
 * Swagger API Version
 */
config.swaggerOptions = {
  apiVersion: '1.0.0'
};

config.store = {
  uri : "mongodb://localhost/EMS"
}