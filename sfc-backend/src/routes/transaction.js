const express = require('express');
const mongoose = require('mongoose'); // for mongoDB
const axios = require("axios").default; // for bank API request
const router = express.Router();

// env value
const env = require('dotenv').config(); //add .env file 
const dbConfig = JSON.parse(env.parsed.DB_INFO);
const baseUrl = "https://openapi.wooribank.com:444"; // api
const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'appKey': env.parsed.APP_KEY
}

// LOCAL DB connection
mongoose.connect(`mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.role}`, {
    dbName: `${dbConfig.database}`,
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('Transaction DB Connected!'))
    .catch(err => {
        console.log("Transaction DB Connection Error: " + err.message);
    });


const User = require("../models/user");
const Transaction = require("../models/transaction");

// 트렌잭션 리스트 얻어오기! 
/**
 * @returns insert 결과 list
 */
router.post("/", function (req, res, next) {
    const options = {
        method: 'POST',
        url: `${baseUrl}/oai/wb/v1/finance/getAccTransList`,
        headers: headers,
        data: {
            dataHeader: {
                UTZPE_CNCT_IPAD: '',
                UTZPE_CNCT_MCHR_UNQ_ID: '',
                UTZPE_CNCT_TEL_NO_TXT: '',
                UTZPE_CNCT_MCHR_IDF_SRNO: '',
                UTZ_MCHR_OS_DSCD: '',
                UTZ_MCHR_OS_VER_NM: '',
                UTZ_MCHR_MDL_NM: '',
                UTZ_MCHR_APP_VER_NM: ''
            },
            dataBody: {
                INQ_ACNO: req.body.account, // account! 
                INQ_STA_DT: '20210101',
                INQ_END_DT: '20210310',
                NEW_DT: '20140522',
                ACCT_KND: 'P',
                CUCD: 'KRW'
            }
        }
    };

    // request API frist
    axios.request(options)
        .then((response) => {
            const { dataBody: { GRID } } = response.data;
            Transaction
                .insertMany(GRID)
                .then(result => {
                    return res.status(200).json({ result });
                })
                .catch(err => {
                    return res.status(500).json({ err });
                });
        }).catch(function (error) {
            return res.status(500).json({ error });
        });
});



module.exports = router;