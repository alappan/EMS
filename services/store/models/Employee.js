var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Employee = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  middleName: {
    type: String,
    trim: true
  },
  password: String,
  email: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Employee', Employee);