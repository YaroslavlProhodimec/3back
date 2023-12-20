"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const db_1 = require("../db/db");
class PostRepository {
    static getAllPosts() {
        return db_1.db.posts;
    }
    static addPost(post) {
        const foundedPost = db_1.db.posts.find((el) => el.id === post.id);
        if (foundedPost) {
            return Object.assign(Object.assign({}, foundedPost), { id: post.id });
        }
        db_1.db.posts.push(post);
        return post;
    }
    static deletePost(id) {
        let foundedIndexPost = db_1.db.posts.findIndex(b => b.id === id);
        db_1.db.posts.splice(foundedIndexPost, 1);
        if (!foundedIndexPost) {
            return null;
        }
        return foundedIndexPost;
    }
    static updatePost(id, blog) {
        let foundedIndexPost = db_1.db.posts.findIndex(b => b.id === id);
        let foundedPost = db_1.db.posts.find(b => b.id === id);
        let { title, shortDescription, content, blogId } = blog;
        const updatedPost = Object.assign(Object.assign({}, foundedPost), { title, shortDescription, content, blogId });
        db_1.db.posts.splice(foundedIndexPost, 1, updatedPost);
        if (!foundedPost) {
            return null;
        }
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
