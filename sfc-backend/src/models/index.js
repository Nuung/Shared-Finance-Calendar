'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = require('dotenv').config(); //add .env file 
const config = JSON.parse(env.parsed.DB_INFO);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


// create database using schema, if tables not exists // table 구조!
db.Toilet = require('./entity/Toilet_entity')(sequelize, Sequelize);
db.User = require('./entity/User_entity')(sequelize, Sequelize); 
db.OAuth = require('./entity/Oauth_entity')(sequelize, Sequelize); 
db.Review = require('./entity/Review_entity')(sequelize, Sequelize);
db.Rating = require('./entity/Rating_entity')(sequelize, Sequelize);
db.Bookmark = require('./entity/Bookmark_entity')(sequelize, Sequelize);

// 관계 설정 
db.Toilet.hasMany(db.Review);
db.Toilet.hasMany(db.Bookmark);
db.Toilet.hasMany(db.Rating);
db.User.hasMany(db.Review);
db.User.hasMany(db.Bookmark);
db.OAuth.belongsTo(db.User);
db.Review.hasMany(db.Rating);
db.Review.belongsTo(db.Toilet);
db.Review.belongsTo(db.User);
db.Rating.belongsTo(db.Toilet);
db.Rating.belongsTo(db.Review);
db.Bookmark.belongsTo(db.User);
db.Bookmark.belongsTo(db.Toilet);

module.exports = db;


