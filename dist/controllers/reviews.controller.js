"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviews_service_1 = require("../services/reviews.service");
const database_service_1 = require("../services/database.service");
const servicesHandlers_1 = require("../handlers/servicesHandlers");
const reviewsRouter = express_1.default.Router();
reviewsRouter.post("/", async (req, res) => {
    const answer = await (0, reviews_service_1.create)(req.body);
    res.status(201).json(answer);
});
reviewsRouter.get("/", async (req, res) => {
    const answer = await (0, servicesHandlers_1.getAll)(database_service_1.reviewsCollection);
    res.status(200).send(answer);
});
reviewsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const answer = await (0, servicesHandlers_1.findById)(id, database_service_1.reviewsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
});
reviewsRouter.get("/author/:id", async (req, res) => {
    const { id } = req.params;
    const answer = await (0, servicesHandlers_1.findByAuthorId)(id, database_service_1.reviewsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
});
reviewsRouter.get("/course/:id", async (req, res) => {
    const { id } = req.params;
    const answer = await (0, servicesHandlers_1.findByCourseId)(id, database_service_1.reviewsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
});
reviewsRouter.patch("/:id", async (req, res) => {
    const answer = await (0, servicesHandlers_1.updateOne)(req.params.id, req.body, database_service_1.reviewsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(201).send(answer);
    }
});
reviewsRouter.delete("/:id", async (req, res) => {
    const answer = await (0, servicesHandlers_1.deleteOne)(req.params.id, database_service_1.reviewsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
});
exports.default = reviewsRouter;
