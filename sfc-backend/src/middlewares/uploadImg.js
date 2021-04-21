const multer = require('multer')
const path = require('path');
// const { restore } = require('sequelize/lib/model');
const fs = require('fs');

// Multer Config
const options = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            console.log(req.originalUrl); // can get request's "endpoint"

            // user name + time(date) + random value
            const ext = path.extname(file.originalname); // 확장자 
            // console.log(path.basename(file.originalname, ext)); // 파일 실제 이름 
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
        // limits: { fileSize: 200 * 1024 * 1024 },
    })
});

// multer object
const toiletImageMulter = multer(options).single("image"); // just one file
const multerArray = multer(options).array(); // Array of files
const multerObj = multer(options);

// middleware 본체
const uploadImgMiddle = (req, res, next) => {

    fs.readdir('uploads', (error) => { // read directory
        if (error) {
            console.error('upload폴더가 없어서 폴더를 생성합니다.')
            fs.mkdirSync('uploads');
        }
    });

    try {
        toiletImageMulter(req, res, error => {
            if (error) {
                console.log(error)
                return res.status(500).json({ error });
            }

            if (!req.file) {
                const error = { errorMessage: '파일이 존재하지 않습니다.' };
                return res.status(404).json(error);
            }

            // return res.status(201).json({
            //     success: true,
            //     image: req.file.path,
            //     fileName: req.file.filename,
            // });

            // filename function을 거친 후의 filename을 body에 저장해주기 
            req.body.imageName = req.file.filename;
            return next();
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ error });
    }
};

// 종착점 함수 
const uploadImg = (req, res, data) => {

    fs.readdir('uploads', (error) => { // read directory
        if (error) {
            console.error('upload폴더가 없어서 폴더를 생성합니다.')
            fs.mkdirSync('uploads');
        }
    });

    try {
        multerArray(req, res, error => {
            if (error) {
                console.log(error)
                return res.status(500).json({ error });
            }

            if (!req.file) {
                const error = { errorMessage: '파일이 존재하지 않습니다.' };
                return res.status(404).json(error);
            }

            return res.status(201).json({
                result: data,
                success: true,
                image: req.file.path,
                fileName: req.file.filename
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ error });
    }
};

module.exports = { multerObj, uploadImg, uploadImgMiddle };