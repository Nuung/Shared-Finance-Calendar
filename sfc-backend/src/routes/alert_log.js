const express = require('express');
const mongoose = require('mongoose'); // for mongoDB
const ObjectID = require('mongodb').ObjectID; // for mongoDB's OID
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
    .then(() => console.log('alertRouter DB Connected!'))
    .catch(err => {
        console.log("alertRouter DB Connection Error: " + err.message);
    });


const User = require("../models/user");
const Transaction = require("../models/transaction");
const Excute = require("../models/transaction_excute"); // alert_log와 상관 있습니다!
const Schedule = require("../models/schedule");
const Alert = require("../models/alert_log");

// 해당 유저의 알림 모두 가져오기 -> "status"는 0이고 "log 생성 날짜순" 정렬!!
router.get("/:userId", async function (req, res, next) {

    Alert
        .find({ "status": 0, "userId": req.params.userId })
        .sort({ "created_at": -1 })
        .then((result) => {
            return res.status(200).json({ result });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ error });
        });

});


/** Update alert log -> status change! -> excute!
 * @returns insert 결과
 */
router.put("/", async function (req, res, next) {

    const result = await Alert.findById({ "_id": ObjectID(req.body.alert_log_id) });

    // 이미 처리된 log면 error
    if (result.status == 1) return res.status(404).json({ result: "이미 이체 처리된 알람입니다." });

    Alert
        .updateOne({ "_id": ObjectID(req.body.alert_log_id) }, { "status": req.body.status, "updated_at": new Date() })
        .then(res_update => {

            // 당행간 계좌 거래 실시! 
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
                        WDR_ACNO: req.body.myAccount, // 출금 계좌번호
                        TRN_AM: result.amount, // 거래 금액 
                        RCV_BKCD: '020',
                        RCV_ACNO: result.targetAccount, // 입금 계좌 
                        PTN_PBOK_PRNG_TXT: result.memo, // 저장될 말
                    }
                }
            };

            // request 우리은행 API
            axios.request(options)
                .then((response) => {

                    const { dataBody } = response.data;
                    const newExcute = new Excute(dataBody);
                    newExcute.userId = result.userId;

                    // 우리은행 API 결과 값 ~ excute collection에 저장
                    newExcute
                        .save()
                        .then((res_excuit_api) => {
                            return res.status(201).json({ res_excuit_api });
                        })
                        .catch(function (err) {
                            console.error(err);
                            return res.status(500).json({ err });
                        });

                }).catch((error) => {
                    console.error(error);
                    return res.status(500).json({ error });
                });

        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ err });
        });
});


router.get("/rank/:userId", async function (req, res, next) {

    // return data
    const result = { resultOwn: {}, resultBelong: {} }

    // 내가 이체 받은 내역
    const resultOwn = await Alert.find({ "fromUserId": req.params.userId }).catch((error) => {
        console.error(error);
        return res.status(500).json({ error });
    });

    for (let i = 0; i < resultOwn.length; i++) {
        if (result['resultOwn'][`${resultOwn[i]['userId']}`])
            result['resultOwn'][`${resultOwn[i]['userId']}`] = result['resultOwn'][`${resultOwn[i]['userId']}`] + resultOwn[i]['amount'];
        else
            result['resultOwn'][`${resultOwn[i]['userId']}`] = resultOwn[i]['amount'];
    }

    // 내가 이제 한 내역 
    const resultBelong = await Alert.find({ "userId": req.params.userId }).catch((error) => {
        console.error(error);
        return res.status(500).json({ error });
    });

    for (let i = 0; i < resultBelong.length; i++) {
        if (result['resultBelong'][`${resultBelong[i]['userId']}`])
            result['resultBelong'][`${resultBelong[i]['userId']}`] = result['resultBelong'][`${resultBelong[i]['userId']}`] + resultBelong[i]['amount'];
        else
            result['resultBelong'][`${resultBelong[i]['userId']}`] = resultBelong[i]['amount'];
    }

    return res.status(200).json({ result });

});

// 3. 캘린더에 등록한 일정 중에 모임이 끝나고 정산한 것만 => alert_log status 0 => userId 해당, amount get! / 월 별로
router.get("/calculation/:userId", async function (req, res, next) {

    Alert
        .find({ "status": 1, "userId": req.params.userId })
        .then((result) => {
            return res.status(200).json({ result });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ error });
        });
});


module.exports = router;