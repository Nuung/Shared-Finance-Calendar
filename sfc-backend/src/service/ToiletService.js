const ToiletModel = require('../models/ToiletModel')

class ToiletService {

    constructor() {
        this.ToiletModel = new ToiletModel();
    }

    async registerToiletData(data) {
        try {
            const result = await this.ToiletModel.registerNewToilet(data); // return boolean
            return result;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getNearToilets(lat, lon) {
        try {
            const toilet = await this.ToiletModel.getNearToiletData(lat, lon);
            return toilet;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getToiletInfobyId(toiletId, userId) {
        try {
            const toilet = await this.ToiletModel.findOneToiletWithBookmark(toiletId, userId);
            return toilet;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

module.exports = ToiletService 