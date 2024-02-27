import express, {NextFunction, Request, Response} from "express";
import {create} from "../services/comments.service";
import {commentsCollection} from "../services/database.service";
import {getAll,findById,updateOne,deleteOne, findByAuthorId,findByLessonId} from "../handlers/servicesHandlers";
import {checkAuth} from "../handlers/checkAccess";
const commentsRouter = express.Router();

commentsRouter.post("/", checkAuth, async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const answer = await create(req.body, req["user"]?.id);
        res.status(201).redirect(`../lessons/course/${req.body.courseId}`);
});

commentsRouter.get("/", async (req:Request, res:Response):Promise<void> => {
    const answer = await getAll(commentsCollection);
    res.status(200).send(answer);
});

commentsRouter.get("/:id", async (req:Request, res:Response):Promise<void> => {
    const {id} = req.params;
    const answer = await findById(id,commentsCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(200).send(answer);
    }
});

commentsRouter.get("/author/:id", async (req:Request, res:Response):Promise<void> => {
    const {id} = req.params;
    const answer = await findByAuthorId(id,commentsCollection);
    res.status(200).send(answer);
});

commentsRouter.get("/lesson/:id", async (req:Request, res:Response):Promise<void> => {
    const {id} = req.params;
    const answer = await findByLessonId(id,commentsCollection);
    res.status(200).send(answer);
});

commentsRouter.patch("/:id", async (req:Request, res:Response):Promise<void>=> {
    const answer = await updateOne(req.params.id,req.body,commentsCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(201).send(answer);
    }
});

commentsRouter.delete("/:id", async (req:Request, res:Response):Promise<void> => {
    const answer = await deleteOne(req.params.id,commentsCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(200).send(answer);
    }
});

export default commentsRouter;