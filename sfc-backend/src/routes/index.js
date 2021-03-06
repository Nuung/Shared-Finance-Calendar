const express = require('express');
const mongoose = require('mongoose'); // for mongoDB
const ObjectID = require('mongodb').ObjectID; // for mongoDB's OID
const router = express.Router();
const child_process = require('child_process'); // for process checking and running

// env value
const env = require('dotenv').config(); //add .env file 
const dbConfig = JSON.parse(env.parsed.DB_INFO);

// LOCAL DB connection
mongoose.connect(`mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.role}`, {
    dbName: `${dbConfig.database}`,
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log("DB Connection Error: " + err.message);
    });


// load DB schema
const Config = require("../models/config");

//────────────────────────────────────────────────────────────────────────────────────────────//

/* function setting area */


// 넘어온 값이 빈값인지 체크합니다. -> !value 하면 생기는 논리적 오류를 제거하기 위해
// 명시적으로 value == 사용 / [], {} 도 빈값으로 처리
const isAllEmpty = function (value) {
    if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true
    } else {
        return false
    }
};

// find collection 
function find(name, query, cb) {
    mongoose.connection.db.collection(name, function (err, collection) {
        collection.find(query).toArray(cb);
    });
}

// deleteData collection 
function deleteData(name, query) {
    mongoose.connection.db.collection(name, function (err, collection) {
        collection.deleteOne(query);
    });
}

//────────────────────────────────────────────────────────────────────────────────────────────//

// READ ALL
router.get('/api/test', function (req, res, next) {
    Config.find({}, function (err, result) { // SELECT * FROM config;
        if (err) {
            console.error(err);
            return res.status(500).json({ result: `Fail: ${err}` });
        }
        else res.status(200).json({ result: result });
    });
});

// Insert One
router.post('/api/test', function (req, res, next) {
    const newConfig = new Config();
    newConfig.data = "test";
    newConfig.save(function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ result: `Fail: ${err}` });
        }
        else res.status(201).json({ result: result });
    });
});

// Find by Params
router.get('/api/test/:data', function (req, res, next) {
    Config.findOne({ "data": req.params.data }, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ result: `Fail: ${err}` });
        }
        else res.status(200).json({ result: result });
    });
});


// get 실시간 상황 
/*
router.get('/api/live', function (req, res, next) {
    TwitchRaffleResult.findById({ "_id": ObjectID('6084495e957d77dac7e864e9') }, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ result: `Fail: ${err}` });
        }
        else res.status(200).json({ result: result['result_json'] });
    });
});

// get raffle result
router.get('/api/raffle', function (req, res, next) {
    const command = `python3 /home/ubuntu/twitch_calculation.py`;
    child_process.exec(command, (err, stdout, stdin) => {
        if (err) res.status(500).json({ result: err });
        else res.status(200).json({ result: stdout });
    });
});

// config setting 
router.put('/api/config', function (req, res, next) {

    const newConfig = new Config(req.body);
    Config.findByIdAndUpdate({ "_id": ObjectID('60827e0d957d77dac7e864e8') }, { "$set": { "nick_name": "test" } }, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ result: `Fail: ${err}` });
        }
        else res.status(201).json({ result: `new Config set up success!` });
    });
    // res.render('index');
});

// init request
router.delete('/api/init', function (req, res, next) {
    // TwitchChatDumps Collection (Table)
    TwitchChatDumps.deleteMany({}, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ result: `Fail: ${err}` });
        }
        else {
            TwitchRaffleResult.updateOne({ "type": "Leaderboard" }, { "$set": { "result_json": "" } }, function (err, result) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ result: `Fail: ${err}` });
                }
                else res.status(201).json({ result: `Initializing success!` });
            });
        }
    });
});
*/

module.exports = router;
