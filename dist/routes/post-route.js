"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const express_1 = require("express");
exports.postRoute = (0, express_1.Router)({});
// postRoute.get('/posts', (req: Request, res: Response) => {
//     const posts = PostRepository.getAllPosts()
//     res.status(200).send(posts)
// })
//
// postRoute.post('/posts', authMiddleware,postValidation(),  (req: Request, res: Response) => {
//     const blogs = PostRepository.addPost(req.body)
//     res.status(201).send(blogs)
// })
// postRoute.delete('/posts/:id', authMiddleware, (req: Request<BlogParams>, res: Response) => {
//     const blogs = PostRepository.deletePost(req.params.id)
//     if (!blogs) {
//         res.sendStatus(404)
//     }
//     res.sendStatus(204)
// })
// postRoute.put('/posts/:id', authMiddleware, postValidation(), (req: Request<BlogParams>, res: Response) => {
//     const blogs = PostRepository.updatePost(req.params.id, req.body)
//
//     if (!blogs) {
//         res.sendStatus(404)
//     }
//     res.sendStatus(204)
// })
//
// postRoute.get('/posts/:id', (req: Request<BlogParams>, res: Response) => {
//     const id = req.params.id
//     const blog = PostRepository.getPostById(id)
//
//     if (!blog) {
//         res.sendStatus(404)
//     }
//     res.send(blog)
// })
//
