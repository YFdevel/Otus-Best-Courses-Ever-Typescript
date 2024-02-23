import express from "express";
import {create, getCommentsGroupByLesson} from "../services/lessons.service.js";
import {lessonsCollection, commentsCollection} from "../index.js";
import {
    getAll,
    findById,
    updateOne,
    deleteOne,
    findByAuthorId,
    findByCourseId,
    getLinkOfCollections
} from "../handlers/servicesHandlers.js";
import {checkAuth} from "../handlers/checkAccess.js";

const lessonsRouter = express.Router();

lessonsRouter.post("/", async (req, res) => {
    const answer = await create(req.body, req.files);

    if (typeof answer === "string") {
        res.status(400).json({message: answer});

    } else {
        res.status(201).json(answer);
    }
});

lessonsRouter.get("/", async (req, res) => {
    const answer = await getAll(lessonsCollection);
    res.status(200).send(answer);
});

lessonsRouter.get("/create/:courseId", checkAuth, async (req, res) => {
    res.status(200).render("lesson-create",{
        authorId:req.user?.id,
        courseId: req.params.courseId
    });
});

lessonsRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findById(id, lessonsCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(200).send(answer);
    }
});

lessonsRouter.get("/author/:id", async (req, res) => {
    const {id} = req.params;
    const answer = await findByAuthorId(id, lessonsCollection);
    res.status(200).send(answer);
});

lessonsRouter.get("/course/:id", checkAuth, async (req, res) => {
    const {id} = req.params;
    const initialLessons = await findByCourseId(id, lessonsCollection);
    const comments = await getCommentsGroupByLesson(id);
    const lessons = getLinkOfCollections(initialLessons, comments);
    res.status(200).render("lessons-page", {
        courseId:id,
        lessons,
        authorId:req.user?.id
    });
});

lessonsRouter.patch("/:id", async (req, res) => {
    const answer = await updateOne(req.params.id, req.body, lessonsCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(201).send(answer);
    }
});

lessonsRouter.delete("/:id", async (req, res) => {
    const answer = await deleteOne(req.params.id, lessonsCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(200).send(answer);
    }
});

export default lessonsRouter;