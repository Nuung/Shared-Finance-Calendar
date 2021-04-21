const Toilet = require('.').Toilet;
const Bookmark = require('.').Bookmark; // for checking user's bookmark 여부 
const Rating = require('.').Rating; // for Getting near toilets with rating
const db = require('.');


class ToiletModel {
    async registerNewToilet(data) {
        try {
            await Toilet.create({
                id: data.id,
                name: data.name,
                open_time: data.open_time,
                sex: data.sex,
                latitude: data.latitude,
                longitude: data.longitude,
                image: data.image,
                city_name: data.city_name,
                goo_name: data.goo_name,
                dong_name: data.dong_name,
                street_name: data.street_name,
                street_num_main: data.street_num_main,
                street_num_sub: data.street_num_sub,
                detail: data.detail
            });
            return true
        }
        catch (error) { throw new Error(error); }
    }

    // query 작성할 일이 없음!!
    async findOneToilet(toilet_id) {
        const toilet = await Toilet.findOne({
            where: { id: toilet_id }
        });
        return toilet;
    }

    // Bookmark가 없으면 "bookmarks": [] / 있으면 "bookmarks": [ 해당 rows return ]
    async findOneToiletWithBookmark(toilet_id, userId) {
        const result = await Toilet.findOne({
            where: {
                id: toilet_id
            },
            include: [
                {
                    model: Bookmark,
                    where: {
                        userId: userId
                    },
                    required: false
                }
            ]
        });
        return result;
    }

    // Get Near Toilet
    async getNearToiletData(lat, lon) {
        const latRange = parseFloat(lat);
        const lonRange = parseFloat(lon);
        // LEFT OUTER JOIN + Group by with rate_avg!! 시퀄 쿼리 몰라서 raw로 날림 ㅎ
        const rawQuery = "SELECT `toilet`.`id`, `toilet`.`name`, `toilet`.`open_time`, `toilet`.`sex`, `toilet`.`latitude`, `toilet`.`longitude`, `toilet`.`image`, `toilet`.`city_name`, `toilet`.`goo_name`, `toilet`.`dong_name`, `toilet`.`street_name`, `toilet`.`street_num_main`, `toilet`.`street_num_sub`, `toilet`.`detail`, `toilet`.`createdAt`, `toilet`.`updatedAt`, AVG(ratings.rate) as rate_avg FROM `toilets` AS `toilet` LEFT OUTER JOIN `ratings` AS `ratings` ON `toilet`.`id` = `ratings`.`toiletId` WHERE (`toilet`.`longitude` <= ? AND `toilet`.`longitude` >= ?) AND (`toilet`.`latitude` <= ? AND `toilet`.`latitude` >= ?) GROUP BY toilet.id;";
        try {
            const toilet = await db.sequelize.query(rawQuery, { replacements: [lonRange + 0.01, lonRange - 0.01, latRange + 0.01, latRange - 0.01], type: db.sequelize.QueryTypes.SELECT, raw: true });
            /*
            const toilet = await Toilet.findAll({
                // attributes: [[Sequelize.fn('avg', Sequelize.col('rate')), 'rate_avg']],
                where: { // --> and 조건, lat+ 거리 보다 작고 ,lon + 거리보다 작고 
                    longitude: {
                        [Op.lte]: parseFloat(lon) + 0.01,
                        [Op.gte]: lon - 0.01
                    },
                    latitude: {
                        [Op.lte]: parseFloat(lat) + 0.01,
                        [Op.gte]: lat - 0.01
                    }
                },
                include: [
                    {
                        model: Rating,
                        attributes: [[Sequelize.fn('AVG', Sequelize.col('ratings.rate')), 'rate_avg']],
                        // separate : true,
                        required: true
                    }
                ],
                group: [ 'toilet.id' ]
            });
            */
            return toilet;
        }
        catch (error) { throw new Error(error); }
    }
}

module.exports = ToiletModel