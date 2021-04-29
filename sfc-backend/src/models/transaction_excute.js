const mongoose = require('mongoose');

const transaction_excute = new mongoose.Schema({
    /*
        OWAC_FNM: '홍길동', // my account owner -> 예금주 ~ user에서 get
        BFTR_AF_BAL: '7212000', // amount -> 거래전후잔액 
        RNPE_FNM: '김우리', // 수취인 성명
        FEE_Am: '0' // 수수료 
    */
    userId: String,
    OWAC_FNM: String,
    BFTR_AF_BAL: String,
    RNPE_FNM: String,
    FEE_Am: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

transaction_excute.set('collection', 'transaction_excute'); // collection 이름 정하기
module.exports = mongoose.model('transaction_excute', transaction_excute);