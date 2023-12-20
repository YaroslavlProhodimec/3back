import {Router, Request, Response} from "express";
import {BlogParams} from "../types/blog/input";
import {BlogRepository} from "../repositories/blog-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogPostValidation, idParamsValidation} from "../validators/blogs-validator";

export const blogRoute = Router({})

blogRoute.get('/blogs',(req: Request, res: Response) => {
    const blogs = BlogRepository.getAllBlogs()
    res.status(200).send(blogs)
})

blogRoute.post('/blogs',authMiddleware,blogPostValidation(),(req: Request, res: Response) => {
    const blogs = BlogRepository.addBlog(req.body)
    res.status(201).send(blogs)
})

blogRoute.delete('/blogs/:id',authMiddleware,idParamsValidation,(req: Request<BlogParams>, res: Response) => {
    const blogs = BlogRepository.deleteBlog(req.params.id)
    if(!blogs){
        res.sendStatus(404)
    }
    res.sendStatus(204)
})
blogRoute.put('/blogs/:id',authMiddleware,blogPostValidation(),idParamsValidation,(req: Request<BlogParams>, res: Response) => {
    const blogs = BlogRepository.updateBlogs(req.params.id,req.body)

    if (!blogs) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
})

blogRoute.get('/blogs/:id',idParamsValidation, (req: Request<BlogParams>, res: Response) => {
    const id = req.params.id
    const blog = BlogRepository.getBlogsById(id)

    if (!blog) {
        res.sendStatus(404)
    }
    res.send(blog)
})

