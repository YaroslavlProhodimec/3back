"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueId = exports.BlogRepository = void 0;
const uuid_1 = require("uuid");
const index_1 = require("../index");
const mongodb_1 = require("mongodb");
const mapper_1 = require("../types/blog/mapper");
class BlogRepository {
    static getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            const result = yield index_1.blogCollection.find({}).toArray();
            // return {
            //     id: result._id,
            //     name: result.name,
            //     description: result.description,
            //     websiteUrl: result.websiteUrl,
            //     createdAt: createdAt.toISOString(),
            //     isMembership: false,
            // }
            return result;
            // } catch (e){
            //     console.log(e,'ERROR getAllBlogs')
            //  }
        });
    }
    static getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id, 'id');
            const blog = yield index_1.blogCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            console.log(blog, 'blog');
            if (!blog) {
                return null;
            }
            return (0, mapper_1.blogMapper)(blog);
        });
    }
    static addBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdAt = new Date();
            const publicationDate = new Date();
            publicationDate.setDate(createdAt.getDate() + 1);
            const result = yield index_1.blogCollection.insertOne(Object.assign(Object.assign({}, blog), { isMembership: true, createdAt: createdAt }));
            const found = yield index_1.blogCollection.findOne({ _id: result.insertedId });
            return {
                id: found._id.toString(),
                name: found.name,
                description: found.description,
                websiteUrl: found.websiteUrl,
                isMembership: found.isMembership,
                createdAt: found.createdAt.toISOString()
            };
        });
    }
    static updateBlog(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongodb_1.ObjectId(id);
            console.log(id, 'id');
            // console.log(updateData,'updateData')
            const found = yield index_1.blogCollection.findOne({ _id: objectId });
            console.log(found, 'found');
            let result = yield index_1.blogCollection.updateOne({ _id: objectId }, {
                $set: {
                    name: updateData.name,
                    description: updateData.description,
                    websiteUrl: updateData.websiteUrl,
                }
            });
            console.log(result, 'result');
            return !!result.matchedCount;
        });
    }
    static deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.blogCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return !!result.deletedCount;
        });
    }
    static deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.blogCollection.deleteMany({});
            return !!result.deletedCount;
        });
    }
}
exports.BlogRepository = BlogRepository;
function generateUniqueId() {
    const fullUUID = (0, uuid_1.v4)();
    return fullUUID.slice(0, 28);
}
exports.generateUniqueId = generateUniqueId;
