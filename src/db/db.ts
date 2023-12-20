import {BlogType} from "../types/blog/output";

type DBType = {
    videos: VideoType[]
    blogs: BlogType[]
    posts: PostType[]
}

export let db: DBType = {
    videos: [{
        id: 1,
        title: "string",
        author: "string",
        availableResolutions: [
            "P144"
        ],
        canBeDownloaded: true,
        createdAt: "2023-12-14T23:03:10.177Z",
        minAgeRestriction: null,
        publicationDate: "2023-12-14T23:03:10.177Z",

    }],
    blogs:[{
        id:'string',
        name:'string',
        description:'string',
        websiteUrl:'string'
    }],
    posts:[ {
        id: "string",
        title: "string",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string"
    }]
}