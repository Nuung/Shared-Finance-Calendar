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
    .then(() => console.log('scheduleRouter DB Connected!'))
    .catch(err => {
        console.log("scheduleRouter DB Connection Error: " + err.message);
    });


const User = require("../models/user");
const Transaction = require("../models/transaction");
const Excute = require("../models/transaction_excute"); // alert_log와 상관 있습니다!
const Schedule = require("../models/schedule");
const Alert = require("../models/alert_log");

/** Add schedule!
 * @returns insert 결과
 */
router.post("/", function (req, res, next) {

    // createUserId는 front에서 가지고 있는 user의 ID 값으로 
    // targetAccount front에서 가지고 있는 user의 account 값으로 (미정)
    const newSchedule = new Schedule(req.body);
    newSchedule.createUserId = req.body.userId;
    newSchedule.targetAccount = req.body.account;

    newSchedule
        .save()
        .then(result => {
            return res.status(201).json({ result });
        })
        .catch(err => {
            return res.status(500).json({ err });
        });
});

// 스케쥴 status 0 -> 1 update! 
router.put("/", async function (req, res, next) {
    const result = await Schedule.findById({ "_id": ObjectID(req.body.targetId) });

    // 이미 status가 1인 스케쥴이면 error
    if (result.status == 1) return res.status(404).json({ result: "이미 이체 처리된 알람입니다." });
    Schedule
        .updateOne({ "_id": ObjectID(req.body.targetId) }, { "status": req.body.status, "updated_at": new Date() })
        .then(result => {
            return res.status(201).json({ result });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ err });
        });
});


/** Get schedule by month and year!
 * @returns find 결과 array
 */
router.get("/:userId", function (req, res, next) {

    // date filter
    const rangeStart = new Date(`${Number(req.query.year)}-01-01`);
    const rangeEnd = new Date(`${Number(req.query.year)}-12-31`);

    // createUserId (모임주), sharedUserId (array)에 현재 달력을 보고 있는 유저 ID이 있는것들 모두 불러와야함
    Schedule
        .find({
            $or: [{ "startTime": { $gte: rangeStart, $lt: rangeEnd }, "createUserId": req.params.userId },
            { "startTime": { $gte: rangeStart, $lt: rangeEnd }, "sharedUserId": { "$in": [req.params.userId] } }]
        })
        .then(result => {
            return res.status(200).json({ result });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ err });
        });
});

/** Insert new alert_log
 * @returns find by ObjectId and Updaet! 결과 return
 */
router.post("/alert", function (req, res, next) {

    // "스플릿할 대상 체크 박스 [] " 를 통해 userId array list
    // 가격도 입력해서 넘겨준다!
    const { user_list, fromUserId, targetSchedule, targetAccount, amount, memo } = req.body;

    // user_list에 스플릿할 넘들 array (곧 userId가 된다)
    const splitAmount = amount / user_list.length;
    const newAlertList = []
    for (let i = 0; i < user_list.length; i++) {
        const newAlertLog = {}
        newAlertLog.userId = user_list[i];
        newAlertLog.fromUserId = fromUserId;
        newAlertLog.targetSchedule = targetSchedule;
        newAlertLog.targetAccount = targetAccount;
        newAlertLog.amount = splitAmount;
        newAlertLog.memo = memo;
        newAlertList.push(newAlertLog);
    }
    Alert
        .insertMany(newAlertList)
        .then(result => {

            return res.status(201).json({ result });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ err });
        });
});



module.exports = router;