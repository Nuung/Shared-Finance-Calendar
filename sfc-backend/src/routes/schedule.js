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

/** Get schedule by month and year!
 * @returns find 결과 array
 */
router.get("/:userId", function (req, res, next) {

    // date filter
    let rangeStart = new Date(`${Number(req.query.year)}-${Number(req.query.month)}`);
    rangeStart.setDate(rangeStart.getDate() + 1);
    const rangeEnd = new Date(`${Number(req.query.year)}-${Number(req.query.month) + 1}`);

    // createUserId (모임주), sharedUserId (array)에 현재 달력을 보고 있는 유저 ID이 있는것들 모두 불러와야함
    Schedule
        .find({
            $or: [{ "startTime": { $gte: rangeStart, $lt: rangeEnd }, "createUserId": req.params.userId },
            { "startTime": { $gte: rangeStart, $lt: rangeEnd }, "sharedUserId": { "$in": [req.params.userId] } }]
        })
        .then(result => {

            return res.status(201).json({ result });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ err });
        });
});


/** Insert new alert_log
 * @returns find by ObjectId and Updaet! 결과 return
 */
router.put("/alert", function (req, res, next) {
    
    // -> 


});



module.exports = router;