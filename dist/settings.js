"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const AvailableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
const videos = [
    {
        id: 1,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-12-14T23:03:10.177Z",
        publicationDate: "2023-12-14T23:03:10.177Z",
        availableResolutions: [
            "P144"
        ]
    }
];
exports.app.get('/videos', (req, res) => {
    res.status(200);
    res.send(videos);
});
exports.app.use(express_1.default.json());
exports.app.get('/videos/:id', (req, res) => {
    let founded = videos.find((el) => el.id === +req.params.id);
    if (!founded) {
        res.sendStatus(404);
        return;
    }
    res.send(founded);
});
exports.app.post('/videos', (req, res) => {
    let errors = {
        errorsMessages: []
    };
    let { title, author, availableResolutions } = req.body;
    if (!title || !title.trim() || title.trim().length > 40) {
        errors.errorsMessages.push({ message: 'Invalid title', field: 'title' });
    }
    if (!author || !author.trim() || author.trim().length > 20) {
        errors.errorsMessages.push({ message: 'Invalid author', field: 'author' });
    }
    if (Array.isArray(availableResolutions)) {
        availableResolutions.map((el) => {
            !AvailableResolutions.includes(el) && errors.errorsMessages.push({
                message: "Invalid availableResolutions",
                field: 'availableResolutions'
            });
        });
    }
    else {
        availableResolutions = [];
    }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    }
    const createdAt = new Date();
    const publicationDate = new Date();
    publicationDate.setDate(createdAt.getDate() + 1);
    const newVideo = {
        id: +(new Date()),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        title,
        author,
        availableResolutions
    };
    videos.push(newVideo);
    res.status(201).send(newVideo);
});
exports.app.put('/videos/:id', (req, res) => {
    let errors = {
        errorsMessages: []
    };
    let { title, author, availableResolutions, publicationDate, minAgeRestriction, canBeDownloaded } = req.body;
    if (!title || !title.trim() || title.trim().length > 40) {
        errors.errorsMessages.push({ message: 'Invalid title', field: 'title' });
    }
    if (!author || !author.trim() || author.trim().length > 20) {
        errors.errorsMessages.push({ message: 'Invalid author', field: 'author' });
    }
    if (Array.isArray(availableResolutions)) {
        availableResolutions.map((el) => {
            !AvailableResolutions.includes(el) && errors.errorsMessages.push({
                message: "Invalid availableResolutions",
                field: 'availableResolutions'
            });
        });
    }
    else {
        availableResolutions = [];
    }
    if (typeof canBeDownloaded === 'undefined') {
        canBeDownloaded = false;
    }
    if (typeof canBeDownloaded === 'string') {
        errors.errorsMessages.push({ message: 'Invalid canBeDownloaded', field: 'canBeDownloaded' });
    }
    if (typeof minAgeRestriction !== 'undefined' && typeof minAgeRestriction === 'number') {
        minAgeRestriction < 1 ||
            minAgeRestriction > 18 && errors.errorsMessages.push({
                message: "Invalid minAgeRestriction",
                field: 'minAgeRestriction'
            });
    }
    else {
        minAgeRestriction = null;
    }
    if (typeof publicationDate === 'number') {
        errors.errorsMessages.push({ message: 'Invalid publicationDate', field: 'publicationDate' });
    }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    }
    const videoIndex = videos.findIndex(v => v.id === +req.params.id);
    const video = videos.find(v => v.id === +req.params.id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    const updateItem = Object.assign(Object.assign({}, video), { canBeDownloaded,
        minAgeRestriction,
        title,
        author,
        availableResolutions, publicationDate: publicationDate ? publicationDate : video.publicationDate });
    videos.splice(videoIndex, 1, updateItem);
    res.sendStatus(204);
});
exports.app.delete('/videos/:id', (req, res) => {
    const id = +req.params.id;
    const indexId = videos.findIndex((el) => el.id === id);
    const element = videos.find((el) => el.id === id);
    if (!element) {
        res.sendStatus(404);
        return;
    }
    videos.splice(indexId, 1);
    res.sendStatus(204);
});
exports.app.delete('/testing/all-data', (req, res) => {
    res.status(204).send('All data is deleted');
});
