'use strict';
// --------------- middlewares --------------- //

const { uploadImg } = require('../middlewares/uploadImg');
const verifyToken = require('../middlewares/auth');

// --------------- Routing --------------- //

module.exports = (app) => {
    const {
        signUp,
        localSignin,
        signUpIdCheck,
        getUserData,
        kakaoSignin,
        kakaoSigncallBack
    } = require('../controllers/userController');

    app.route('/local/signup').post(signUp);
    app.route('/local/signup/:id').get(signUpIdCheck);
    app.route('/local/signin').post(localSignin);

    app.use('/local/user', verifyToken);
    app.route('/local/user').get(getUserData);
    
    app.route('/oauth/kakao/signin').post(kakaoSignin);
    app.route('/oauth/kakao/callback').get(kakaoSigncallBack);

    app.use('/local/upload/image', verifyToken);
    app.route('/local/upload/image').post(uploadImg);
};



