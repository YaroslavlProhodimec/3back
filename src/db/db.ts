import {BlogType} from "../types/blog/output";

type DBType = {
    videos: VideoType[]
    blogs: BlogType[]
    posts: PostType[]
}

export let db: DBType = {
    videos: [],
    blogs:[],
    posts:[]
}
export function clearAllData(): void {
    db.videos = [];
    db.blogs = [];
    db.posts = [];
}