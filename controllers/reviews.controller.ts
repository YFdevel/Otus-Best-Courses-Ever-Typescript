import express,{Router, Request, Response} from "express";
import {create} from "../services/reviews.service";
import {reviewsCollection} from "../services/database.service";
import {getAll,findById,updateOne,deleteOne, findByAuthorId,findByCourseId} from "../handlers/servicesHandlers";
const reviewsRouter = Router();

reviewsRouter.post("/", async (req:Request, res:Response):Promise<void> => {
    const answer = await create(req.body);
    res.status(201).json(answer);
});

reviewsRouter.get("/", async (req:Request, res:Response):Promise<void> => {
    const answer = await getAll(reviewsCollection);
    res.status(200).send(answer);
});

reviewsRouter.get("/:id", async (req:Request, res:Response):Promise<void> => {
    const {id} = req.params;
    const answer = await findById(id,reviewsCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(200).send(answer);
    }
});

reviewsRouter.get("/author/:id", async (req:Request, res:Response):Promise<void> => {
    const {id} = req.params;
    const answer = await findByAuthorId(id,reviewsCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(200).send(answer);
    }
});

reviewsRouter.get("/course/:id", async (req:Request, res:Response):Promise<void> => {
    const {id} = req.params;
    const answer = await findByCourseId(id,reviewsCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(200).send(answer);
    }
});

reviewsRouter.patch("/:id", async (req:Request, res:Response):Promise<void> => {
    const answer = await updateOne(req.params.id,req.body,reviewsCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(201).send(answer);
    }
});

reviewsRouter.delete("/:id", async (req:Request, res:Response):Promise<void> => {
    const answer = await deleteOne(req.params.id,reviewsCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(200).send(answer);
    }
});

export default reviewsRouter;