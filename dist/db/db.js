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
exports.runDb = exports.productCollection = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const settings_1 = require("../settings");
dotenv_1.default.config();
const port = 5000;
const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';
console.log(process.env.MONGO_URL);
const client = new mongodb_1.MongoClient(mongoURI);
// const db = client.db('node-blog')
// export const blogCollection = db.collection ('blog')
//
//
// export const postCollection = db.collection('post')
exports.productCollection = client.db().collection('products');
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield runDb();
    settings_1.app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Listen on port ${port}`);
    }));
});
settings_1.app.get('/', (req, res) => {
    res.send('Hello, world!');
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
            yield client.close();
        }
    });
}
exports.runDb = runDb;
startApp();
