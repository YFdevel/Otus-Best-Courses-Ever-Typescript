"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lessons_service_1 = require("../services/lessons.service");
const database_service_1 = require("../services/database.service");
const servicesHandlers_1 = require("../handlers/servicesHandlers");
const checkAccess_1 = require("../handlers/checkAccess");
const lessonsRouter = express_1.default.Router();
lessonsRouter.post("/", async (req, res) => {
    const answer = await (0, lessons_service_1.create)(req.body, req["files"]);
    if (typeof answer === "string") {
        res.status(400).json({ message: answer });
    }
    else {
        res.status(201).json(answer);
    }
});
lessonsRouter.get("/", async (req, res) => {
    const answer = await (0, servicesHandlers_1.getAll)(database_service_1.lessonsCollection);
    res.status(200).send(answer);
});
lessonsRouter.get("/create/:courseId", checkAccess_1.checkAuth, async (req, res) => {
    var _a;
    res.status(200).render("lesson-create", {
        authorId: (_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id,
        courseId: req.params.courseId
    });
});
lessonsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const answer = await (0, servicesHandlers_1.findById)(id, database_service_1.lessonsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
});
lessonsRouter.get("/author/:id", async (req, res) => {
    const { id } = req.params;
    const answer = await (0, servicesHandlers_1.findByAuthorId)(id, database_service_1.lessonsCollection);
    res.status(200).send(answer);
});
lessonsRouter.get("/course/:id", checkAccess_1.checkAuth, async (req, res) => {
    var _a;
    const { id } = req.params;
    const initialLessons = await (0, servicesHandlers_1.findByCourseId)(id, database_service_1.lessonsCollection);
    const comments = await (0, lessons_service_1.getCommentsGroupByLesson)(id);
    const lessons = (0, servicesHandlers_1.getLinkOfCollections)(initialLessons, comments);
    res.status(200).render("lessons-page", {
        courseId: id,
        lessons,
        authorId: (_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id
    });
});
lessonsRouter.patch("/:id", async (req, res) => {
    const answer = await (0, servicesHandlers_1.updateOne)(req.params.id, req.body, database_service_1.lessonsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(201).send(answer);
    }
});
lessonsRouter.delete("/:id", async (req, res) => {
    const answer = await (0, servicesHandlers_1.deleteOne)(req.params.id, database_service_1.lessonsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
});
exports.default = lessonsRouter;
