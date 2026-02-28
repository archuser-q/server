const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  username: String,
  ip: String,
  status: String, 
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoginHistory', loginSchema)