'use strict'
const BookmarkService = require('../service/BookmarkService');

const registerNewBookmark = async (req, res) => {

    try {
        const bookmarkService = new BookmarkService();
        const check = await bookmarkService.registerBookmarkData(req.body);

        if (check) {
            const data = {
                message: '북마크 등록에 성공했습니다'
            };
            console.log(data);
            res.status(201).json({ data });
        }
        else {
            const data = {
                message: '북마크 등록에 실패했습니다.'
            };

            console.log(data);
            res.status(401).json({ data });
        }

    }
    catch (error) {
        console.log(error);
        const errorMessage = "북마크 등록에 실패하였습니다."
        return res.status(401).json({ errorMessage })
    }
};

const findBookmarksByToiletId = async (req, res) => {
    try {
        const bookmarkService = new BookmarkService();
        console.log(`----controller: bookmark find by toilet id: ${req.params.id}`);
        const result = await bookmarkService.findBookmarksByToiletId(req.params.id);
        if (result) {
            console.log({ result });
            res.status(201).json({ result });
        }
        else {
            const data = {
                message: '북마크 조회에 실패했습니다.'
            };
            console.log(data);
            res.status(401).json({ data });
        }

    }
    catch (error) {
        console.log(error);
        const errorMessage = "북마크 조회에 실패했습니다."
        return res.status(401).json({ errorMessage });
    }
};


const findBookmarksByUserId = async (req, res) => {
    try {
        const bookmarkService = new BookmarkService();
        console.log(`----controller: bookmark find by user id: ${req.params.id}`);
        const result = await bookmarkService.findBookmarksByUserId(req.params.id);
        if (result) {
            console.log({ result });
            res.status(201).json({ result });
        }
        else {
            const data = {
                message: '북마크 조회에 실패했습니다.'
            };
            console.log(data);
            res.status(401).json({ data });
        }

    }
    catch (error) {
        console.log(error);
        const errorMessage = "북마크 조회에 실패하였습니다."
        return res.status(401).json({ errorMessage });
    }
};


const deleteBookmark = async (req, res) => {
    const logs = "----controller: bookmark delete by user and toilet id"; // log flags
    try {
        const bookmarkService = new BookmarkService();
        console.log(`${logs}: ${req.body.user_id, req.body.toilet_id}`);
        const result = await bookmarkService.deleteBookmark(req.body);
        if (result) {
            console.log({ result });
            res.status(201).json({ result });
        }
        else {
            if (!req.body.user_id || !req.body.toilet_id) {
                const data = {
                    message: '북마크 삭제에 실패했습니다. 올바른 데이터 값을 넣어주세요!'
                };
                console.log(data);
                res.status(404).json({ data });
            }
            else {
                const data = {
                    message: '북마크 삭제에 실패했습니다.'
                };
                console.log(data);
                res.status(401).json({ data });
            }
        }

    }
    catch (error) {
        console.log(error);
        const errorMessage = "북마크 삭제에 실패하였습니다."
        return res.status(401).json({ errorMessage });
    }
};

module.exports = { registerNewBookmark, findBookmarksByToiletId, findBookmarksByUserId, deleteBookmark };