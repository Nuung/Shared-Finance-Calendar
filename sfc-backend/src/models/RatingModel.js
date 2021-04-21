const Rating = require('.').Rating;

class RatingModel {

    async registerNewRating(data) {
        try {
            await Rating.create({
                toiletId: data.toiletId,
                reviewId: data.id,
                rate: data.rate
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    
    async findAllRatingByToiletId(toiletId) {
        try {
            console.log(`----model: rating find by toiletId: ${toiletId}`);
            const rating = await Rating.findAll({
                where: { toiletId }
            });
            return rating;
        }
        catch (error) {
            throw new Error("Model findAllRatingByToiletId: " + error);
        }
    }

    /*
    async findAllRatingByUserId(userId) {
        try {
            console.log(`----model: rating find by UserId: ${userId}`);
            const rating = await Rating.findAll({
                where: { userId }
            });
            return rating;
        }
        catch (error) {
            throw new Error("Model findAllRatingByUserId: " + error);
        }
    }

    // SELECT AVG(rate) AS "rate" FROM ratings WHERE toiletId="";
    async getAvgRatingByToiletId(toiletId) {
        try {
            console.log(`----model: getAvgRatingByToiletId: ${toiletId}`);
            const rating = await Rating.findAll({
                attributes: [[sequelize.fn('avg', sequelize.col('rate')), 'rate']],
                where: { id }
            });
            return rating;
        }
        catch (error) {
            throw new Error("Model getAvgRatingByToiletId: " + error);
        }
    }
    */
}

module.exports = RatingModel;