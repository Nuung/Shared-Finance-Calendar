'use strict';

/**
 * @desc    - review body값 유효성 검사 조지기
 * @target  - reviewDTO
 */
const { check, validationResult } = require('express-validator');

const validateReviewCreate = [
    check('title')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('review title can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required in review title!')
        .bail(),
    check('clean_of_toilet')
        .trim()
        .not()
        .isEmpty()
        .withMessage('clean_of_toilet can not be empty!')
        .bail()
        .isNumeric()
        .withMessage('clean_of_toilet must be number!')
        .bail(),
    check('amount_of_tissue')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('amount_of_tissue can not be empty!')
        .bail()
        .isNumeric()
        .withMessage('amount_of_tissue must be number!')
        .bail(),
    check('is_old')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('is_old can not be empty!')
        .bail()
        .isNumeric()
        .withMessage('is_old must be number!')
        .bail(),
    check('is_secret')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('is_secret can not be empty!')
        .bail()
        .isNumeric()
        .withMessage('is_secret must be number!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];

module.exports = {
    validateReviewCreate
};