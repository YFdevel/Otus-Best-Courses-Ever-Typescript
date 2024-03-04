"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courses_service_1 = require("../services/courses.service");
const database_service_1 = require("../services/database.service");
const servicesHandlers_1 = require("../handlers/servicesHandlers");
const checkAccess_1 = require("../handlers/checkAccess");
const coursesRouter = express_1.default.Router();
coursesRouter.post("/", async (req, res) => {
    const answer = await (0, courses_service_1.create)(req.body);
    if (typeof answer === "string") {
        res.status(400).json({ message: answer });
    }
    else {
        res.status(201).json(answer);
    }
});
coursesRouter.get("/", async (req, res) => {
    const answer = await (0, servicesHandlers_1.getAll)(database_service_1.coursesCollection);
    res.status(200).render("courses-page", { list: answer });
});
coursesRouter.get("/:id", checkAccess_1.checkAuth, async (req, res) => {
    var _a, _b;
    const { id } = req.params;
    const user = await (0, servicesHandlers_1.findById)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, database_service_1.usersCollection);
    const course = await (0, servicesHandlers_1.findById)(id, database_service_1.coursesCollection);
    const author = ((_b = req["user"]) === null || _b === void 0 ? void 0 : _b.id) === course.authorId;
    //res.status(200).send(answer);
    res.render("course-detail", {
        user, course, author
    });
});
coursesRouter.get("/author/:id", async (req, res) => {
    const { id } = req.params;
    const answer = await (0, servicesHandlers_1.findByAuthorId)(id, database_service_1.coursesCollection);
    res.status(200).send(answer);
});
coursesRouter.patch("/:id", async (req, res) => {
    const answer = await (0, servicesHandlers_1.updateOne)(req.params.id, req.body, database_service_1.coursesCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(201).send(answer);
    }
});
coursesRouter.delete("/:id", async (req, res) => {
    const answer = await (0, servicesHandlers_1.deleteOne)(req.params.id, database_service_1.coursesCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
});
exports.default = coursesRouter;
