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
import { create } from "../services/reviews.service";
import { reviewsCollection } from "../services/database.service";
import { getAll, findById, updateOne, deleteOne, findByAuthorId, findByCourseId } from "../handlers/servicesHandlers";
const reviewsRouter = Router();
reviewsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield create(req.body);
    res.status(201).json(answer);
}));
reviewsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield getAll(reviewsCollection);
    res.status(200).send(answer);
}));
reviewsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const answer = yield findById(id, reviewsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
}));
reviewsRouter.get("/author/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const answer = yield findByAuthorId(id, reviewsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
}));
reviewsRouter.get("/course/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const answer = yield findByCourseId(id, reviewsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
}));
reviewsRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield updateOne(req.params.id, req.body, reviewsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(201).send(answer);
    }
}));
reviewsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield deleteOne(req.params.id, reviewsCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
}));
export default reviewsRouter;
