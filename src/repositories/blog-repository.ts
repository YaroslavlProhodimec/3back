import {db} from '../db/db'
import {BlogType} from "../types/blog/output";

export class BlogRepository {

    static getAllBlogs() {
        return db.blogs
    }

    static addBlog(blog: BlogType) {
        db.blogs.push(blog)
        return blog
    }

    static deleteBlog(id: string) {
        let foundedIndexBlog: any = db.blogs.findIndex(b => b.id === id)
        db.blogs.splice(foundedIndexBlog, 1)
        if (!foundedIndexBlog) {
            return null
        }
        return foundedIndexBlog
    }

    static updateBlogs(id: string, blog: BlogType) {
        let foundedIndexBlog: any = db.blogs.findIndex(b => b.id === id)
        let foundedBlog: any = db.blogs.find(b => b.id === id)
        let {id: blogId, name, description, websiteUrl} = blog
        const updatedBlogs = {
            ...foundedBlog,
            name, description, websiteUrl
        }
        db.blogs.splice(foundedIndexBlog, 1, updatedBlogs)

        if (!foundedBlog) {
            return null
        }

        return updatedBlogs
    }

    static getBlogsById(id: string) {
        const blog = db.blogs.find(b => b.id === id)
        if (!blog) {
            return null
        }
        return blog
    }
}

