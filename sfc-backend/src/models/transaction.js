const mongoose = require('mongoose');

const transaction = new mongoose.Schema({
    /*
    "INQ_ACNO": "1002123456789", // 해당 계좌 ACCOUNT NUMBER
    "TRN_DT": "2021-04-26",
    "TRN_TM": "121322",
    "TRN_SRNO": "7",
    "CUCD": "KRW",
    "PBOK_PRNG_OTLN_CD": "0318",
    "DPS_RAP_KDCD": "200",
    "MD_KDCD": "MIBMPSB2",
    "RCV_AM": "0.000",
    "PAY_AM": "697000.000",
    "DPS_BAL": "746300000.000",
    "TRN_TXT": "홍길동",
    "PID_SQ": "0",
    "TRN_STCD": "300800000.000"
    */
    INQ_ACNO: String,
    TRN_DT: String,
    TRN_TM: String,
    TRN_SRNO: String,
    CUCD: String,
    PBOK_PRNG_OTLN_CD: String,
    DPS_RAP_KDCD: String,
    MD_KDCD: String,
    RCV_AM: String,
    PAY_AM: String,
    DPS_BAL: String,
    TRN_TXT: String,
    PID_SQ: String,
    TRN_STCD: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

transaction.set('collection', 'transaction'); // collection 이름 정하기
module.exports = mongoose.model('transaction', transaction);