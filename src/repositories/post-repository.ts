import {db} from '../db/db'
import {BlogType} from "../types/blog/output";

export class PostRepository {

    static getAllPosts() {
        return db.posts
    }

    static addPost(post: PostType) {
        db.posts.push(post)
        return post
    }

    static deletePost(id: string) {
        let foundedIndexPost: any = db.posts.findIndex(b => b.id === id)
        db.posts.splice(foundedIndexPost, 1)
        if (!foundedIndexPost) {
            return null
        }
        return foundedIndexPost
    }

    static updatePost(id: string, blog: PostType) {
        let foundedIndexPost: any = db.posts.findIndex(b => b.id === id)
        let foundedPost: any = db.posts.find(b => b.id === id)
        let { title, shortDescription, content,blogId} = blog
        const updatedPost = {
            ...foundedPost,
            title, shortDescription, content,blogId,
        }
        db.posts.splice(foundedIndexPost, 1, updatedPost)

        if (!foundedPost) {
            return null
        }

        return updatedPost
    }

    static getPostById(id: string) {
        const post = db.posts.find(b => b.id === id)
        if (!post) {
            return null
        }
        return post
    }
}

