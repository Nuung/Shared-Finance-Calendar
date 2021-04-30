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
    .then(() => console.log('User DB Connected!'))
    .catch(err => {
        console.log("User DB Connection Error: " + err.message);
    });


const User = require("../models/user"); //load schema


// Auth for Phone number
/**
 * @returns 인증고유 번호! auth_token!
 */
router.post("/phone", function (req, res, next) {
    const options = {
        method: 'POST',
        url: `${baseUrl}/oai/wb/v1/login/getCellCerti`,
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
                COMC_DIS: '1', // 통신사 1. SKT 2. KT 3. LGU+ 5. SKT(알뜰폰) 6. KT(알뜰폰) 7. LGU+(알뜰폰)
                HP_NO: req.body.phone_number,
                HP_CRTF_AGR_YN: 'Y', // 약관 동의 
                FNM: req.body.name, // 이름 
                RRNO_BFNB: req.body.birth, // 주민번호앞자리
                ENCY_RRNO_LSNM: '1234567' // 암호화주민번호뒷자리 필요 X 
            }
        }
    };

    // request API frist
    axios.request(options)
        .then((response) => {
            // dataBody: { CRTF_UNQ_NO: 'MG33785615878699202094', VCNT: '' }
            const { dataBody } = response.data;
            return res.status(201).json({ dataBody });
        }).catch(function (error) {
            return res.status(500).json({ error });
        });
});


// Check for Phone number Auth
/**
 * @returns 고객사용계좌번호 -> account라고 생각하자
 */
router.post("/phone/auth", function (req, res, next) {
    const options = {
        method: 'POST',
        url: `${baseUrl}/oai/wb/v1/login/executeCellCerti`,
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
                RRNO_BFNB: req.body.birth, // 주민번호앞자리
                ENCY_RRNO_LSNM: "1234567", // 암호화주민번호뒷자리, 필요 X
                ENCY_SMS_CRTF_NO: req.body.auth_number, // SMS인증번호, random O
                CRTF_UNQ_NO: req.body.auth_token // 인증고유번호! 
            }
        }
    };

    // request and res
    axios.request(options).then(function (response) {
        const { dataBody } = response.data;
        return res.status(201).json({ dataBody });
        // dataBody['REPT_FA'][0]['CUS_USG_ACNO'] 고객사용계좌번호 -> account라고 생각하자
    }).catch(function (error) {
        console.error(error);
    });
});


// User Create
router.post("/", function (req, res, next) {
    const { name, userId, userPassword, phoneNumber, account } = req.body;
    const newUser = new User(req.body);

    newUser
        .save()
        .then(result => {
            return res.status(200).json({ result });
        })
        .catch(err => {
            return res.status(500).json({ err });
        });
});



// Get Target User's info
router.get("/:user_id", function (req, res, next) {
    User
        .findOne({ "userId": req.params.user_id })
        .then(result => {
            return res.status(200).json({ result });
        })
        .catch(err => {
            return res.status(500).json({ err });
        });
});


// Get Target User's account info
router.get("/account/:user_id", function (req, res, next) {
    User
        .findOne({ "userId": req.params.user_id })
        .then(result => {
            return res.status(200).json({ result: result['account'] });
        })
        .catch(err => {
            return res.status(500).json({ err });
        });
});


// ---------------------------------------------------------------------------------------- //




//read all OK
router.get("/read", function (req, res, next) {
    users
        .find()
        .then(users => {
            console.log("Read All 완료");
            res.status(200).json({
                message: "Read All success",
                data: {
                    user: users
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
});

// Update
router.put("/update/:user_id", function (req, res, next) {
    const user_id = req.params.user_id;
    const { account } = req.body;

    users
        .findOne({ userId: user_id })
        .then(user => {
            if (!user) return res.status(404).json({ message: "not found" });
            user.account = account;

            user.save().then(output => {
                console.log("Update 완료");
                res.status(200).json({
                    message: "Update success",
                    data: {
                        user: output
                    }
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
});

// Delete OK
router.delete("/delete/:d_id", function (req, res, next) {
    const d_id = req.params.d_id;

    users
        .deleteOne({ account: d_id })
        .then(output => {
            if (output.n == 0)
                return res.status(404).json({ message: "not found" });
            console.log("Delete 완료");
            res.status(200).json({
                message: "Delete success"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
});

module.exports = router;