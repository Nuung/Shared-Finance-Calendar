const mongoose = require('mongoose'); // for mongoDB
const Schema = mongoose.Schema;
 
const config = new Schema({
    data: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

config.set('collection', 'config'); // collection 이름 정하기
module.exports = mongoose.model('config', config);