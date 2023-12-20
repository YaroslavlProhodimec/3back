"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const db_1 = require("../db/db");
const blog_repository_1 = require("./blog-repository");
class PostRepository {
    static getAllPosts() {
        return db_1.db.posts;
    }
    static addPost(post) {
        const foundedPost = db_1.db.posts.find((el) => el.id === post.id);
        if (foundedPost) {
            return Object.assign(Object.assign({}, foundedPost), { id: post.id });
        }
        let newPosts = Object.assign(Object.assign({}, post), { id: (0, blog_repository_1.generateUniqueId)(), blogId: (0, blog_repository_1.generateUniqueId)(), blogName: (0, blog_repository_1.generateUniqueId)() });
        db_1.db.posts.push(newPosts);
        return Object.assign({}, newPosts);
    }
    static deletePost(id) {
        let foundedIndexPost = db_1.db.posts.findIndex(b => b.id === id);
        if (foundedIndexPost === -1) {
            return null;
        }
        db_1.db.posts.splice(foundedIndexPost, 1);
        return foundedIndexPost;
    }
    static updatePost(id, blog) {
        let foundedIndexPost = db_1.db.posts.findIndex(b => b.id === id);
        let foundedPost = db_1.db.posts.find(b => b.id === id);
        let { blogId, title, shortDescription, content, } = blog;
        if (foundedIndexPost === -1) {
            return null;
        }
        const updatedPost = Object.assign(Object.assign({}, foundedPost), { blogId,
            title, shortDescription, content });
        db_1.db.posts.splice(foundedIndexPost, 1, updatedPost);
        return updatedPost;
    }
    static getPostById(id) {
        const post = db_1.db.posts.find(b => b.id === id);
        if (!post) {
            return null;
        }
        return post;
    }
}
exports.PostRepository = PostRepository;
