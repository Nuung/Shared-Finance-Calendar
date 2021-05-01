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
const Excute = require("../models/transaction_excute");


// 임의의 내용이 담긴 트렌잭션 결과값 얻어 오기
/*
router.post("/", function (req, res, next) {

    const memoRandom
    const result = [];

    // ~ ~ ~ 
    const temp = {
        "TRN_DT": "2021-04-26",
        "TRN_TM": "121322",
        "TRN_SRNO": "0",
        "CUCD": "KRW",
        "PBOK_PRNG_OTLN_CD": "0318",
        "DPS_RAP_KDCD": "200",
        "MD_KDCD": "MIBMPSB2",
        "RCV_AM": "0.000",
        "PAY_AM": "032000.000",
        "DPS_BAL": "114000000.000",
        "TRN_TXT": "홍길동",
        "PID_SQ": "0",
        "TRN_STCD": "376700000.000",
        "INQ_ACNO": req.body.account,
    },

});
*/

// 트렌잭션 리스트 얻어오기! 
/**
 * @returns insert 결과 list
 */
router.get("/:account", function (req, res, next) {

    Transaction
        .find({ "INQ_ACNO": req.params.account })
        .then((result) => {
            return res.status(200).json({ result });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });

    // const options = {
    //     method: 'POST',
    //     url: `${baseUrl}/oai/wb/v1/finance/getAccTransList`,
    //     headers: headers,
    //     data: {
    //         dataHeader: {
    //             UTZPE_CNCT_IPAD: '',
    //             UTZPE_CNCT_MCHR_UNQ_ID: '',
    //             UTZPE_CNCT_TEL_NO_TXT: '',
    //             UTZPE_CNCT_MCHR_IDF_SRNO: '',
    //             UTZ_MCHR_OS_DSCD: '',
    //             UTZ_MCHR_OS_VER_NM: '',
    //             UTZ_MCHR_MDL_NM: '',
    //             UTZ_MCHR_APP_VER_NM: ''
    //         },
    //         dataBody: {
    //             INQ_ACNO: req.params.account, // account! 
    //             INQ_STA_DT: '20210101',
    //             INQ_END_DT: '20210310',
    //             NEW_DT: '20140522',
    //             ACCT_KND: 'P',
    //             CUCD: 'KRW'
    //         }
    //     }
    // };

    // // request API frist
    // axios.request(options)
    //     .then((result) => {
    //         const { dataBody: { GRID } } = result.data;
    //         console.log(GRID)
    //         return res.status(200).json({ GRID });
    //     }).catch(function (error) {
    //         console.log(error);
    //         console.log(error.data);
    //         return res.status(500).json({ error });
    //     });
});


// 트렌잭션 리스트 등록하기!
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
            GRID.forEach(grid => grid.INQ_ACNO = req.body.account); // 기본 key로 account를! 
            Transaction
                .insertMany(GRID)
                .then(result => {
                    return res.status(201).json({ result });
                })
                .catch(err => {
                    return res.status(500).json({ err });
                });
        }).catch(function (error) {
            return res.status(500).json({ error });
        });
});

// self account to target account 
router.post("/execute", function (req, res, next) {

    const { userId, myAccount, amount, targetAccount, text } = req.body;

    const options = {
        method: 'POST',
        url: `${baseUrl}/oai/wb/v1/trans/executeWooriAcctToWooriAcct`,
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
                WDR_ACNO: myAccount, // 출금 계좌번호
                TRN_AM: amount, // 거래 금액 
                RCV_BKCD: '020',
                RCV_ACNO: targetAccount, // 입금 계좌 
                PTN_PBOK_PRNG_TXT: text, // 저장될 말
            }
        }
    };

    // request 
    axios.request(options).then(function (response) {
        const { dataBody } = response.data;
        const newExcute = new Excute(dataBody);
        newExcute.userId = userId;

        newExcute
            .save()
            .then((result) => {
                return res.status(201).json({ result });
            })
            .catch(function (err) {
                console.log(err);
                return res.status(500).json({ err });
            });

    }).catch(function (error) {
        console.log(error);
        return res.status(500).json({ error });
    });
});

module.exports = router;