"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAllData = exports.db = void 0;
exports.db = {
    videos: [],
    blogs: [],
    posts: []
};
function clearAllData() {
    exports.db.videos = [];
    exports.db.blogs = [];
    exports.db.posts = [];
}
exports.clearAllData = clearAllData;
