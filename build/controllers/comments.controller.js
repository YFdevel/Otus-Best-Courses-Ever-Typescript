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
import { create } from "../services/comments.service";
import { commentsCollection } from "../services/database.service";
import { getAll, findById, updateOne, deleteOne, findByAuthorId, findByLessonId } from "../handlers/servicesHandlers";
import { checkAuth } from "../handlers/checkAccess";
const commentsRouter = Router();
commentsRouter.post("/", checkAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const answer = yield create(req.body, (_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id);
    res.status(201).redirect(`../lessons/course/${req.body.courseId}`);
}));
commentsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield getAll(commentsCollection);
    res.status(200).send(answer);
}));
commentsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const answer = yield findById(id, commentsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
}));
commentsRouter.get("/author/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const answer = yield findByAuthorId(id, commentsCollection);
    res.status(200).send(answer);
}));
commentsRouter.get("/lesson/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const answer = yield findByLessonId(id, commentsCollection);
    res.status(200).send(answer);
}));
commentsRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield updateOne(req.params.id, req.body, commentsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(201).send(answer);
    }
}));
commentsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield deleteOne(req.params.id, commentsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
}));
export default commentsRouter;
