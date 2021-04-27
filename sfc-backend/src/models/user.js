const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: String,
    userId: { type: String, unique: true },
    userPassword: String,
    account: { type: String, unique: true },
});

user.set('collection', 'user'); // collection 이름 정하기
module.exports = mongoose.model('user', user);