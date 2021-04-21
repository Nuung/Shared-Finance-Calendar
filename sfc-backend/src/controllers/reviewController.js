'use strict'
const ReviewService = require('../service/ReviewService');

const registerNewReview = async (req, res) => {

    // rating을 위해 가중치 평균: 40 25 35
    const { clean_of_toilet, amount_of_tissue, is_old } = req.body;
    const oldValue = (is_old / 100) * 5;
    req.body.rate = clean_of_toilet * 0.4 + amount_of_tissue * 0.25 + oldValue * 0.35;
    console.log(req.body.imageName);

    try {
        const reviewService = new ReviewService();
        const check = await reviewService.registerReviewData(req.body);

        if (check) {
            const data = {
                message: '리뷰 등록에 성공했습니다'
            };
            return res.status(201).json({ data });
            // return uploadImg(req, res, data);
        }
        else { throw new Error(`리뷰 등록 check True에 실패했습니다.`); }
    }
    catch (error) {
        console.log(error);
        error.localErrorMessage = "리뷰 등록에 실패하였습니다.";
        return res.status(401).json({error})
    }
};

const findOneReviewById = async (req, res) => {
    try {
        const reviewService = new ReviewService();
        console.log(`----controller: review find by id: ${req.params.id}`);
        const result = await reviewService.findOneReviewById(req.params.id);
        if (result) {
            console.log({ result });
            res.status(201).json({ result });
        }
        else {
            const data = {
                message: '리뷰 등록에 실패했습니다.'
            };
            console.log(data);
            res.status(401).json({ data });
        }

    }
    catch (error) {
        console.log(error);
        const errorMessage = "리뷰 등록에 실패하였습니다."
        return res.status(401).json({ errorMessage });
    }
};


const findReviewsByToiletId = async (req, res) => {
    try {
        const reviewService = new ReviewService();
        console.log(`----controller: review find by toilet id: ${req.params.id}`);
        const result = await reviewService.findReviewsByToiletId(req.params.id);
        if (result) {
            console.log({ result });
            res.status(201).json({ result });
        }
        else {
            const data = {
                message: '해당 화장실에 대한 리뷰 찾기를 실패했습니다.'
            };
            console.log(data);
            res.status(401).json({ data });
        }

    }
    catch (error) {
        console.log(error);
        const errorMessage = "해당 화장실에 대한 리뷰 찾기를 실패하였습니다."
        return res.status(401).json({ errorMessage });
    }
};


const findReviewsByUserId = async (req, res) => {
    try {
        const reviewService = new ReviewService();
        console.log(`----controller: review find by user id: ${req.params.id}`);
        const result = await reviewService.findReviewsByUserId(req.params.id);
        if (result) {
            console.log({ result });
            res.status(201).json({ result });
        }
        else {
            const data = {
                message: '해당 유저에 대한 리뷰 찾기를 실패했습니다.'
            };
            console.log(data);
            res.status(401).json({ data });
        }

    }
    catch (error) {
        console.log(error);
        const errorMessage = "해당 유저에 대한 리뷰 찾기를 실패하였습니다."
        return res.status(401).json({ errorMessage });
    }
};

module.exports = { registerNewReview, findOneReviewById, findReviewsByToiletId, findReviewsByUserId };