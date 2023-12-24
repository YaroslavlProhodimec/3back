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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDb = exports.postCollection = exports.blogCollection = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const products_router_1 = require("./routes/products-router");
const settings_1 = require("./settings");
const blog_route_1 = require("./routes/blog-route");
settings_1.app.use('/products', products_router_1.productsRouter);
settings_1.app.use('/blogs', blog_route_1.blogRoute);
dotenv_1.default.config();
const port = 5000;
const mongoURI = process.env.MONGO_URL;
// ||
// 'mongodb://0.0.0.0:27017'
console.log(process.env.MONGO_URL);
// @ts-ignore
const client = new mongodb_1.MongoClient(mongoURI);
const db = client.db('node-blog');
exports.blogCollection = db.collection('blog');
// "name": "string",
//     "description": "string",
//     "websiteUrl": "https://nm0Q.GWyzt0V608mS66b1EP7hBP_tCxjSIWBJ300sSbWqMTyGZbHmDfok8qBKeBRkdKuENpBmHk8HpV.6M5mcqL0.3JG"
exports.postCollection = db.collection('post');
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield runDb();
    settings_1.app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Listen on port ${port}`);
    }));
});
settings_1.app.get('/', (req, res) => {
    res.send('Hello, МИР!');
});
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            // await client.db('products').command({ping: 1})
            console.log('Connected successfully to mongo server');
        }
        catch (e) {
            console.log(`${e}`);
            console.error('Error creating product:', e);
            yield client.close();
        }
    });
}
exports.runDb = runDb;
startApp();
