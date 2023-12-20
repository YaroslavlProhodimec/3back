"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = require("express");
const blog_repository_1 = require("../repositories/blog-repository");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
const blogs_validator_1 = require("../validators/blogs-validator");
exports.blogRoute = (0, express_1.Router)({});
exports.blogRoute.get('/blogs', (req, res) => {
    const blogs = blog_repository_1.BlogRepository.getAllBlogs();
    res.status(200).send(blogs);
});
exports.blogRoute.post('/blogs', auth_middleware_1.authMiddleware, (0, blogs_validator_1.blogPostValidation)(), (req, res) => {
    const blogs = blog_repository_1.BlogRepository.addBlog(req.body);
    res.status(201).send(blogs);
});
exports.blogRoute.delete('/blogs/:id', auth_middleware_1.authMiddleware, blogs_validator_1.idParamsValidation, (req, res) => {
    const blogs = blog_repository_1.BlogRepository.deleteBlog(req.params.id);
    if (!blogs) {
        res.sendStatus(404);
    }
    res.sendStatus(204);
});
exports.blogRoute.put('/blogs/:id', auth_middleware_1.authMiddleware, (0, blogs_validator_1.blogPostValidation)(), blogs_validator_1.idParamsValidation, (req, res) => {
    const blogs = blog_repository_1.BlogRepository.updateBlogs(req.params.id, req.body);
    if (!blogs) {
        res.sendStatus(404);
    }
    res.sendStatus(204);
});
exports.blogRoute.get('/blogs/:id', blogs_validator_1.idParamsValidation, (req, res) => {
    const id = req.params.id;
    const blog = blog_repository_1.BlogRepository.getBlogsById(id);
    if (!blog) {
        res.sendStatus(404);
    }
    res.send(blog);
});
