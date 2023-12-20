"use strict";
// import {body} from "express-validator";
// import {BlogRepository} from "../repositories/blog-repository";
// import {inputModelValidation} from "../middlewares/input-model-validation/input-model-validation";
//
// // export const blogIdValidation = body('blogId').isString().trim().custom((value) => {
// //     const blog = BlogRepository.getBlogsById(value)
// //
// //     if (!blog) {
// //         throw new Error('Incorrect blogId')
// //     }
// //     return true
// //
// // }).withMessage('Incorrect blogId')
//
// export const idValidation = body('id').isString().trim().withMessage('Incorrect id')
//
// export const titleValidation = body('title').isString().trim().isLength({min: 1, max: 10}).withMessage('Incorrect title')
//
//
// export const shortDescriptionValidation = body('shortDescription')
//     .isString().trim()
//     .withMessage('Incorrect URL shortDescription');
// export const contentValidation = body('content')
//     .isString().trim()
//     .withMessage('Incorrect URL content');
// export const blogIdValidation = body('blogId')
//     .isString().trim()
//     .withMessage('Incorrect URL blogId');
// export const blogNameValidation = body('blogName')
//     .isString().trim()
//     .withMessage('Incorrect URL blogName');
//
//
// export const postValidation = () => [idValidation, titleValidation, shortDescriptionValidation, contentValidation,blogIdValidation,blogNameValidation,inputModelValidation]
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidation = exports.blogNameValidation = exports.blogIdValidation = exports.contentValidation = exports.shortDescriptionValidation = exports.titleValidation = exports.idValidation = void 0;
const express_validator_1 = require("express-validator");
const input_model_validation_1 = require("../middlewares/input-model-validation/input-model-validation");
exports.idValidation = (0, express_validator_1.body)('id')
    .optional()
    .isString().trim()
    // .isLength({
    // min: 1,
    // max: 15
    // })
    .withMessage('Incorrect id');
exports.titleValidation = (0, express_validator_1.body)('title').exists().isString().trim().isLength({ min: 1, max: 30 }).withMessage('Incorrect title');
exports.shortDescriptionValidation = (0, express_validator_1.body)('shortDescription').exists()
    .isString().trim()
    .isLength({ max: 100 })
    .withMessage('Incorrect URL shortDescription');
exports.contentValidation = (0, express_validator_1.body)('content')
    .exists()
    .isString().trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Incorrect URL content');
exports.blogIdValidation = (0, express_validator_1.body)('blogId')
    .optional()
    .isLength({ max: 30 })
    .isString().trim()
    .withMessage('Incorrect URL blogId');
exports.blogNameValidation = (0, express_validator_1.body)('blogName')
    // .exists()
    .optional()
    .isString().trim()
    .withMessage('Incorrect URL blogName');
const postValidation = () => [
    exports.idValidation,
    exports.titleValidation, exports.shortDescriptionValidation,
    exports.contentValidation,
    exports.blogIdValidation,
    exports.blogNameValidation,
    input_model_validation_1.inputModelValidation
];
exports.postValidation = postValidation;
