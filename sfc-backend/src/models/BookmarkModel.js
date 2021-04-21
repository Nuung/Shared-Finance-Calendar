const Bookmark = require('.').Bookmark;

class BookmarkModel {

    async registerNewBookmark(data) {
        try {
            await Bookmark.create({
                userId: data.userId,
                toiletId: data.toiletId
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async findBookmarksByToiletId(toiletId) {
        try {
            console.log(`----model: bookmark find by toilet id: ${toiletId}`);
            const bookmark = await Bookmark.findAll({
                where: {
                    toiletId
                },
                raw: true
            });
            return bookmark;
        }
        catch (error) {
            throw new Error("Model findBookmarksByToiletId: " + error);
        }
    }

    async findBookmarksByUserId(userId) {
        try {
            console.log(`----model: bookmark find by user id: ${userId}`);
            const bookmark = await Bookmark.findAll({
                where: {
                    userId
                },
                raw: true
            });
            return bookmark;
        }
        catch (error) {
            throw new Error("Model findBookmarksByuserId: " + error);
        }
    }

    async deleteBookmark(data) {
        const logs = "(`----model: bookmark delete by user and toilet id";
        try {
            console.log(`${logs}: ${data}`);
            const result = await Bookmark.destroy({
                where: {
                    userId: data.user_id,
                    toiletId: data.toilet_id
                }
            });
            return result;
        }
        catch (error) {
            throw new Error(`${logs}: ${error}`);
        }
    }
}

module.exports = BookmarkModel;