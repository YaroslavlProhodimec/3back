"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogPostValidation = exports.websiteUrlValidation = exports.descriptionValidation = exports.nameValidation = void 0;
const express_validator_1 = require("express-validator");
const input_model_validation_1 = require("../middlewares/input-model-validation/input-model-validation");
exports.nameValidation = (0, express_validator_1.body)('name').isString().trim().isLength({ min: 1, max: 15 }).withMessage('Incorrect name');
exports.descriptionValidation = (0, express_validator_1.body)('description').isString().trim().isLength({
    min: 1,
    max: 500
}).withMessage('Incorrect description');
exports.websiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .isString().trim()
    .isLength({ min: 1, max: 100 }).withMessage('Incorrect websiteUrl')
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage('Incorrect URL format');
const blogPostValidation = () => [exports.nameValidation, exports.descriptionValidation, exports.websiteUrlValidation, input_model_validation_1.inputModelValidation];
exports.blogPostValidation = blogPostValidation;
