'use strict';

/**
 * @desc    - toilet body값 유효성 검사 조지기
 * @target  - toiletDTO
 */
const { check, validationResult } = require('express-validator');

const validateToiletCreate = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('toilet name can not be empty!')
        .bail()
        .isLength({ min: 2 })
        .withMessage('Minimum 2 characters required in toilet name!')
        .bail(),
    check('sex')
        .trim()
        .not()
        .isEmpty()
        .withMessage("toilet's sex can not be empty!")
        .bail()
        .isNumeric()
        .withMessage("toilet's sex must be number!")
        .bail()
        .isIn([0, 1, 2])
        .withMessage("toilet's sex must be 0, 1 or 2!")
        .bail(),
    check('city_name')
        .trim()
        .not()
        .isEmpty()
        .withMessage("toilet's city_name can not be empty!")
        .bail(),
    // check('street_num_main')
    //     .trim()
    //     .escape()
    //     .isNumeric()
    //     .withMessage("toilet's street_num_main must be number!")
    //     .bail(),
    // check('street_num_sub')
    //     .trim()
    //     .escape()
    //     .isNumeric()
    //     .withMessage("toilet's street_num_sub must be number!")
    //     .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];

module.exports = {
    validateToiletCreate
};