var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { create, getCommentsGroupByLesson } from "../services/lessons.service";
import { lessonsCollection } from "../services/database.service";
import { getAll, findById, updateOne, deleteOne, findByAuthorId, findByCourseId, getLinkOfCollections } from "../handlers/servicesHandlers";
import { checkAuth } from "../handlers/checkAccess";
const lessonsRouter = Router();
lessonsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield create(req.body, req["files"]);
    if (typeof answer === "string") {
        res.status(400).json({ message: answer });
    }
    else {
        res.status(201).json(answer);
    }
}));
lessonsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield getAll(lessonsCollection);
    res.status(200).send(answer);
}));
lessonsRouter.get("/create/:courseId", checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    res.status(200).render("lesson-create", {
        authorId: (_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id,
        courseId: req.params.courseId
    });
}));
lessonsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const answer = yield findById(id, lessonsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
}));
lessonsRouter.get("/author/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const answer = yield findByAuthorId(id, lessonsCollection);
    res.status(200).send(answer);
}));
lessonsRouter.get("/course/:id", checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const initialLessons = yield findByCourseId(id, lessonsCollection);
    const comments = yield getCommentsGroupByLesson(id);
    const lessons = getLinkOfCollections(initialLessons, comments);
    res.status(200).render("lessons-page", {
        courseId: id,
        lessons,
        authorId: (_b = req["user"]) === null || _b === void 0 ? void 0 : _b.id
    });
}));
lessonsRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield updateOne(req.params.id, req.body, lessonsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(201).send(answer);
    }
}));
lessonsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield deleteOne(req.params.id, lessonsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
}));
export default lessonsRouter;
