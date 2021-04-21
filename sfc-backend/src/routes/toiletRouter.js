'use strict';
// --------------- middlewares --------------- //

const { uploadImg } = require('../middlewares/uploadImg');
const { validateToiletCreate } = require('../middlewares/validators/toiletValidator');
const verifyToken = require('../middlewares/auth');

// --------------- Routing --------------- //

module.exports = (app) => {
    const {
        registerNewToilet,
        getNearToilets,
        getToiletInfobyId
    } = require('../controllers/toiletController');

    // create toilet
    app.use('/toilet', verifyToken);
    app.route('/toilet').get(getToiletInfobyId); // get toilet by id with userid (cuz bookmark)
    app.route('/toilet').post(validateToiletCreate, registerNewToilet);
    // app.route('/toilet').post(validateToiletCreate, uploadImg, registerNewToilet);

    // 이 API를 여러 군대에서 사용해야 하면 upload 이미지를 대표 라우팅 (app js에서 따로 빼내서 또는 파일로 만들어서 또는 미들웨어처럼) 하는 방향이 좋을 것 같습니다.
    // router.post('/local/upload/image', uploadImg);

    app.use('/toilets', verifyToken);
    app.route('/toilets').get(getNearToilets); // 핵심 API
    
};



