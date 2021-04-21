const BookmarkModel = require('../models/BookmarkModel')

class BookmarkService {

    constructor() {
        this.BookmarkModel = new BookmarkModel();
    }

    async registerBookmarkData(data) {
        try {
            console.log("----service: Bookmark register");
            const Bookmark = await this.BookmarkModel.registerNewBookmark(data);
            return Bookmark;

        } catch (error) {
            console.log("Service registerBookmarkData: " + error);
            throw new Error(error);
        }
    }

    async findBookmarksByToiletId(toiletId) {
        try {
            console.log("----service: Bookmark find by toilet id");
            const result = await this.BookmarkModel.findBookmarksByToiletId(toiletId);
            return result;

        } catch (error) {
            console.log("Service findBookmarksByToiletId: " + error);
            throw new Error(error);
        }
    }

    async findBookmarksByUserId(userId) {
        try {
            console.log("----service: Bookmark find by user id");
            const result = await this.BookmarkModel.findBookmarksByUserId(userId);
            return result;

        } catch (error) {
            console.log("Service findBookmarksByUserId: " + error);
            throw new Error(error);
        }
    }

    async deleteBookmark(data) {
        const logs = "----service: Bookmark delete by user and toilet id";
        try {
            console.log(`${logs}: ${data}`);
            const result = await this.BookmarkModel.deleteBookmark(data);
            return result;
        } catch (error) {
            console.log(`${logs}: ${error}`);
            throw new Error(error);
        }
    }
}

module.exports = BookmarkService;