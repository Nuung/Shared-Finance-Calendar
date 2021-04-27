var mongoose = require('mongoose');

var User = new mongoose.Schema({
    name: String,
    userId: { type: String, unique : true },
    userPassword: String,
    account: { type: String, unique : true },
});

module.exports = mongoose.model('User',User);