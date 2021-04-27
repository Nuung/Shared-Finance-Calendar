const express = require('express');
const mongoose = require('mongoose'); // for mongoDB
const UserDB = require('../models/UserDB');
const router = express.Router();

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


const users = require("../models/UserDB"); //load schema

//create OK
  router.post("/create", function(req, res, next) {
    const { name, userId,userPassword,account } = req.body;

    console.log(req.body);
  
    var postModel = new users();
    postModel.name = name;
    postModel.userId = userId;
    postModel.userPassword = userPassword;
    postModel.account = account;

    postModel
      .save()
      .then(newPost => {
        console.log("Create 완료");
        res.status(200).json({
          message: "Create success",
          data: {
            post: newPost
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err
        });
      });
  });
  //read all OK
  router.get("/read", function(req, res, next) {
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
router.put("/update/:user_id", function(req, res, next) {
    const user_id = req.params.user_id;
    const { account } = req.body;
  
    users
    .findOne({userId:user_id})
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
router.delete("/delete/:d_id", function(req, res, next) { 
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