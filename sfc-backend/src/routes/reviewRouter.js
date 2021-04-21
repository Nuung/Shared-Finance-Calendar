'use strict';
// --------------- middlewares --------------- //

const { uploadImgMiddle } = require('../middlewares/uploadImg'); // image upload
const { validateReviewCreate } = require('../middlewares/validators/reviewValidator');
const verifyToken = require('../middlewares/auth');

// --------------- Routing --------------- //

module.exports = (app) => {
    const { 
        registerNewReview, 
        findOneReviewById, 
        findReviewsByToiletId, 
        findReviewsByUserId 
    } = require('../controllers/reviewController');

    // create reivew
    app.use('/review', verifyToken);
    app.route('/review').post(uploadImgMiddle, validateReviewCreate, registerNewReview);

    // test 
    app.route('/test').post(uploadImgMiddle);

    // find all reviews by userId
    app.use('/user/reviews', verifyToken);
    app.route('/user/reviews/:id').get(findReviewsByUserId);

    // find all reviews by toiletId
    app.use('/toilet/reviews', verifyToken);
    app.route('/toilet/reviews/:id').get(findReviewsByToiletId);    
};



