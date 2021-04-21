const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const escapeJSON = require('escape-json-node');

// require Routers
const userRouter = require('./src/routes/userRouter');
const toiletRouter = require('./src/routes/toiletRouter');
const reviewRouter = require('./src/routes/reviewRouter');
const bookmarkRouter = require('./src/routes/bookmarkRouter');


//−−−−−−−−−−−−−−−−− ORM - sequelize Setting −−−−−−−−−−−−−−−−−//
const sequelize = require('./src/models').sequelize;
sequelize.sync();



//−−−−−−−−−−−−−−−−− APP config Setting −−−−−−−−−−−−−−−−−//
require('dotenv').config(); // add .env file 
const app = express();

app.use(logger('dev'));
app.use(express.json()); // body-parser setting ~ express include body-parser from 4.X version
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({ // app session 
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(cors({  // CORS 설정
    origin: true,
    credentials: true
}));
app.set('jwt-secret', process.env.JWT_SECRET); // set the secret key variable for jwt



//−−−−−−−−−−−−−−−−− API Routing Setting −−−−−−−−−−−−−−−−−//
userRouter(app); 
toiletRouter(app);
reviewRouter(app);
bookmarkRouter(app);

// image 사용 할 수 있게 만들어주는 static 
app.use('/img', express.static('uploads'));




//−−−−−−−−−−−−−−−−− Other Config Setting −−−−−−−−−−−−−−−−−//
// catch 404 and forward to error handler
app.use(function (req, res, next) { next(createError(404)); });

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error pag
    res.status(err.status || 500);

    res.json({
        message: err.message,
        error: err
    });

});

module.exports = app;

