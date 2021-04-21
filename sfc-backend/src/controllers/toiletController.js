'use strict'

const uploadImage = require('../middlewares/uploadImg');
const ToiletService = require('../service/ToiletService');
const { Toilet } = require('../models');


const registerNewToilet = async (req, res) => {

    const image = null;

    try {
        const toiletService = new ToiletService();
        const check = await toiletService.registerToiletData(req.body);

        if (check) {
            const data = {
                message: '화장실 등록에 성공했습니다'
            };
            console.log(data);
            return res.status(201).json({ data });
        }
        else {
            const data = {
                message: '화장실 등록에 실패했습니다.'
            };
            console.log(data);
            return res.status(401).json({ data });
        }
    }
    catch (error) {
        console.log(error);
        const errorMessage = "등록에 실패하였습니다."
        return res.status(401).json({ errorMessage })
    }

}

const getNearToilets = async (req, res) => {

    const lat = req.query.lat;
    const lon = req.query.lon;
    if (!lat || !lon) { // lat, lon (GPS value) check
        const data = { message: '현재 위치 정보에 오류가 있습니다. GPS를 확인해 주세요.' }
        return res.status(404).json({ data });
    }

    try {
        const toiletService = new ToiletService()
        const toiletData = await toiletService.getNearToilets(lat, lon);
        const data = { toiletData }
        return res.status(201).json({ data });
    } catch (error) {
        const data = {
            message: '일시적인 서버 오류입니다.'
        }
        return res.status(401).json({ data });
    }
};

const getToiletInfobyId = async (req, res) => {

    const toilet_id = req.query.toilet_id;
    const user_id = req.query.user_id;

    try {
        const toiletService = new ToiletService()
        const toiletData = await toiletService.getToiletInfobyId(toilet_id, user_id);
        const data = { toiletData }
        res.status(201).json({ data });
    } catch (error) {
        const data = {
            message: '일시적인 서버 오류입니다.'
        }
        res.status(401).json({ data });
    }
}

module.exports = { registerNewToilet, getNearToilets, getToiletInfobyId }