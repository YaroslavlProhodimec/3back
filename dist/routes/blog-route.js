"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = require("express");
const blog_repository_1 = require("../repositories/blog-repository");
const blogs_validator_1 = require("../validators/blogs-validator");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
exports.blogRoute = (0, express_1.Router)({});
exports.blogRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_repository_1.BlogRepository.getAllBlogs();
    res.status(200).send(blogs);
}));
exports.blogRoute.get('/:id', blogs_validator_1.idParamsValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const blog = yield blog_repository_1.BlogRepository.getBlogById(id);
    if (!blog) {
        res.sendStatus(404);
    }
    res.send(blog);
}));
exports.blogRoute.post('/', auth_middleware_1.authMiddleware, (0, blogs_validator_1.blogPostValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body,'req.body')
    const blogs = yield blog_repository_1.BlogRepository.addBlog(req.body);
    if (blogs) {
        res.status(201).send(blogs);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.blogRoute.delete('/:id', auth_middleware_1.authMiddleware, blogs_validator_1.idParamsValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_repository_1.BlogRepository.deleteBlog(req.params.id);
    if (!blogs) {
        res.sendStatus(404);
    }
    res.sendStatus(204);
}));
exports.blogRoute.delete('/', auth_middleware_1.authMiddleware, blogs_validator_1.idParamsValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_repository_1.BlogRepository.deleteAllBlogs();
    if (!blogs) {
        res.sendStatus(404);
    }
    res.sendStatus(204);
}));
exports.blogRoute.put('/:id', auth_middleware_1.authMiddleware, (0, blogs_validator_1.blogPostValidation)(), blogs_validator_1.idParamsValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_repository_1.BlogRepository.updateBlog(req.params.id, req.body);
    if (!blogs) {
        res.sendStatus(404);
    }
    res.sendStatus(204);
}));
