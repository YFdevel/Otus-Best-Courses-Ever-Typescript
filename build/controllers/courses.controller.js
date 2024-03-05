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
import { create } from "../services/courses.service";
import { coursesCollection, usersCollection } from "../services/database.service";
import { getAll, findById, updateOne, deleteOne, findByAuthorId } from "../handlers/servicesHandlers";
import { checkAuth } from "../handlers/checkAccess";
const coursesRouter = Router();
coursesRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield create(req.body);
    if (typeof answer === "string") {
        res.status(400).json({ message: answer });
    }
    else {
        res.status(201).json(answer);
    }
}));
coursesRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield getAll(coursesCollection);
    res.status(200).render("courses-page", { list: answer });
}));
coursesRouter.get("/:id", checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    const user = yield findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, usersCollection);
    const course = yield findById(id, coursesCollection);
    const author = ((_b = req["user"]) === null || _b === void 0 ? void 0 : _b.id) === course.authorId;
    //res.status(200).send(answer);
    res.render("course-detail", {
        user, course, author
    });
}));
coursesRouter.get("/author/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const answer = yield findByAuthorId(id, coursesCollection);
    res.status(200).send(answer);
}));
coursesRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield updateOne(req.params.id, req.body, coursesCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(201).send(answer);
    }
}));
coursesRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield deleteOne(req.params.id, coursesCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
}));
export default coursesRouter;
