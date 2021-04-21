'use strict';

const ReviewModel = require('../models/ReviewModel');
const RatingModel = require('../models/RatingModel');

class ReviewService {

    constructor() {
        this.ReviewModel = new ReviewModel();
        this.RatingModel = new RatingModel();
    }

    async registerReviewData(data) {
        try {
            console.log("----service: review register");
            const review = await this.ReviewModel.registerNewReview(data);
            const rating = await this.RatingModel.registerNewRating(data);
            return review && rating;

        } catch (error) {
            console.log("Service registerReviewData: " + error);
            throw new Error(error);
        }
    }

    async findOneReviewById(id) {
        try {
            console.log("----service: review find by id");
            const result = await this.ReviewModel.findOneReviewById(id);
            return result;

        } catch (error) {
            console.log("Service findOneReviewById: " + error);
            throw new Error(error);
        }
    }

    async findReviewsByToiletId(toiletId) {
        try {
            console.log("----service: review find by toilet id");
            const result = await this.ReviewModel.findReviewsByToiletId(toiletId);
            return result;

        } catch (error) {
            console.log("Service findReviewsByToiletId: " + error);
            throw new Error(error);
        }
    }

    async findReviewsByUserId(userId) {
        try {
            console.log("----service: review find by user id");
            const result = await this.ReviewModel.findReviewsByUserId(userId);
            return result;

        } catch (error) {
            console.log("Service findReviewsByUserId: " + error);
            throw new Error(error);
        }
    }
}

module.exports = ReviewService;