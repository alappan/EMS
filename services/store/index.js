

exports.register = function(server, opts, next) {
  server.method('Employee', require('./models/Employee'));
  return next();
};

exports.register.attributes = {
  'name': 'Models',
  'version': '0.0.1'
};