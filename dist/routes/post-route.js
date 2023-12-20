"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
const post_repository_1 = require("../repositories/post-repository");
const post_validator_1 = require("../validators/post-validator");
exports.postRoute = (0, express_1.Router)({});
exports.postRoute.get('/posts', (req, res) => {
    const posts = post_repository_1.PostRepository.getAllPosts();
    res.status(200).send(posts);
});
exports.postRoute.post('/posts', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => {
    const blogs = post_repository_1.PostRepository.addPost(req.body);
    res.status(201).send(blogs);
});
exports.postRoute.delete('/posts/:id', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => {
    const blogs = post_repository_1.PostRepository.deletePost(req.params.id);
    if (!blogs) {
        res.sendStatus(404);
    }
    res.sendStatus(204);
});
exports.postRoute.put('/posts/:id', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => {
    const blogs = post_repository_1.PostRepository.updatePost(req.params.id, req.body);
    if (!blogs) {
        res.sendStatus(404);
    }
    res.sendStatus(204);
});
exports.postRoute.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    const blog = post_repository_1.PostRepository.getPostById(id);
    if (!blog) {
        res.sendStatus(404);
    }
    res.send(blog);
});
