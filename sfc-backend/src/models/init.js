const mongoose = require('mongoose'); // for mongoDB
const ObjectID = require('mongodb').ObjectID; // for mongoDB's OID

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

// Insert Init Data 
Config.findOne({ "data": "test" }, function (err, result) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // input test data
    if (!result) {
        const newConfig = new Config();
        newConfig.data = "test";
        newConfig.save(function (save_err, save_result) {
            if (save_err) {
                console.error(save_err);
                process.exit(1);
            }
            else {
                console.log(save_result);
                process.exit(0);
            }
        });
    }
    else {
        console.log("already set up!");
        process.exit(0)
    }
});