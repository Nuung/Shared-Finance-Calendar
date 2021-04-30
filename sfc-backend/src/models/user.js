const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: String,
    userId: { type: String, unique: true },
    userPassword: String,
    phoneNumber: String,
    account: { type: String, unique: true },
    birth: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

user.set('collection', 'user'); // collection 이름 정하기
module.exports = mongoose.model('user', user);