"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
const db_1 = require("../db/db");
class BlogRepository {
    static getAllBlogs() {
        return db_1.db.blogs;
    }
    static addBlog(blog) {
        const existingBlog = db_1.db.blogs.find((b) => b.id === blog.id);
        if (existingBlog) {
            return Object.assign({}, existingBlog);
        }
        db_1.db.blogs.push(blog);
        return blog;
    }
    static deleteBlog(id) {
        let foundedIndexBlog = db_1.db.blogs.findIndex(b => b.id === id);
        db_1.db.blogs.splice(foundedIndexBlog, 1);
        if (!foundedIndexBlog) {
            return null;
        }
        return foundedIndexBlog;
    }
    static updateBlogs(id, blog) {
        let foundedIndexBlog = db_1.db.blogs.findIndex(b => b.id === id);
        let foundedBlog = db_1.db.blogs.find(b => b.id === id);
        let { id: blogId, name, description, websiteUrl } = blog;
        const updatedBlogs = Object.assign(Object.assign({}, foundedBlog), { name, description, websiteUrl });
        db_1.db.blogs.splice(foundedIndexBlog, 1, updatedBlogs);
        if (!foundedBlog) {
            return null;
        }
        return updatedBlogs;
    }
    static getBlogsById(id) {
        const blog = db_1.db.blogs.find(b => b.id === id);
        if (!blog) {
            return null;
        }
        return blog;
    }
}
exports.BlogRepository = BlogRepository;
