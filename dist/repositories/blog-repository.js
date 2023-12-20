"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
const db_1 = require("../db/db");
const uuid_1 = require("uuid");
class BlogRepository {
    static getAllBlogs() {
        return db_1.db.blogs;
    }
    static addBlog(blog) {
        const existingBlog = db_1.db.blogs.find((b) => b.id === blog.id);
        if (existingBlog) {
            return Object.assign(Object.assign({}, existingBlog), { id: existingBlog.id });
        }
        const newBlog = Object.assign(Object.assign({}, blog), { id: generateUniqueId() });
        db_1.db.blogs.push(newBlog);
        return Object.assign({}, newBlog);
    }
    static deleteBlog(id) {
        let foundedIndexBlog = db_1.db.blogs.findIndex(b => b.id === id);
        db_1.db.blogs.splice(foundedIndexBlog, 1);
        if (foundedIndexBlog === -1) {
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
function generateUniqueId() {
    return (0, uuid_1.v4)();
}
