"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_service_1 = require("../services/comments.service");
const database_service_1 = require("../services/database.service");
const servicesHandlers_1 = require("../handlers/servicesHandlers");
const checkAccess_1 = require("../handlers/checkAccess");
const commentsRouter = express_1.default.Router();
commentsRouter.post("/", checkAccess_1.checkAuth, async (req, res, next) => {
    var _a;
    const answer = await (0, comments_service_1.create)(req.body, (_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id);
    res.status(201).redirect(`../lessons/course/${req.body.courseId}`);
});
commentsRouter.get("/", async (req, res) => {
    const answer = await (0, servicesHandlers_1.getAll)(database_service_1.commentsCollection);
    res.status(200).send(answer);
});
commentsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const answer = await (0, servicesHandlers_1.findById)(id, database_service_1.commentsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
});
commentsRouter.get("/author/:id", async (req, res) => {
    const { id } = req.params;
    const answer = await (0, servicesHandlers_1.findByAuthorId)(id, database_service_1.commentsCollection);
    res.status(200).send(answer);
});
commentsRouter.get("/lesson/:id", async (req, res) => {
    const { id } = req.params;
    const answer = await (0, servicesHandlers_1.findByLessonId)(id, database_service_1.commentsCollection);
    res.status(200).send(answer);
});
commentsRouter.patch("/:id", async (req, res) => {
    const answer = await (0, servicesHandlers_1.updateOne)(req.params.id, req.body, database_service_1.commentsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(201).send(answer);
    }
});
commentsRouter.delete("/:id", async (req, res) => {
    const answer = await (0, servicesHandlers_1.deleteOne)(req.params.id, database_service_1.commentsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
});
exports.default = commentsRouter;
