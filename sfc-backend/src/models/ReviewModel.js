const Review = require('.').Review;
const Rating = require('.').Rating;

class ReviewModel {

    async registerNewReview(data) {
        try {
            await Review.create({
                id: data.id,
                toiletId: data.toiletId,
                userId: data.userId,
                sex: data.sex,
                title: data.title,
                latitude: data.latitude,
                longitude: data.longitude,
                image: data.image,
                clean_of_toilet: data.clean_of_toilet,
                amount_of_tissue: data.amount_of_tissue,
                is_old: data.is_old,
                is_secret: data.is_secret,
                shot_detail: data.shot_detail
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async findOneReviewById(id) {
        try {
            console.log(`----model: review find by id: ${id}`);
            const review = await Review.findAll({
                where: {
                    id
                }
            });
            return review;
        }
        catch (error) {
            throw new Error("Model findOneReviewById: " + error);
        }
    }

    // find by review with toiletId -> And Need Rating by reviewId (to Rating Table)
    // SELECT * from reviews as review JOIN ratings as rating ON rating.reviewId = review.id WHERE review.toiletId = "admin198781306.64245895";
    async findReviewsByToiletId(toiletId) {
        try {
            console.log(`----model: review find by toilet id: ${toiletId}`);
            const review = await Review.findAll({
                where: { toiletId },
                include: [
                    {
                        model: Rating,
                        attributes: ['rate'],
                        required: false
                    }
                ]
            });
            return review;
        }
        catch (error) {
            throw new Error("Model findReviewsByToiletId: " + error);
        }
    }

    async findReviewsByUserId(userId) {
        try {
            console.log(`----model: review find by user id: ${userId}`);
            const review = await Review.findAll({
                where: { userId },
                include: [
                    {
                        model: Rating,
                        attributes: ['rate'],
                        required: false
                    }
                ]
            });
            return review;
        }
        catch (error) {
            throw new Error("Model findOneReviewByuserId: " + error);
        }
    }
}

module.exports = ReviewModel;