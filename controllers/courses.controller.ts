import express,{Router,Request, Response} from "express";
import {create} from "../services/courses.service";
import {coursesCollection,usersCollection} from "../services/database.service";
import {getAll,findById,updateOne,deleteOne, findByAuthorId} from "../handlers/servicesHandlers";
import {checkAuth} from "../handlers/checkAccess";
const coursesRouter = Router();

coursesRouter.post("/", async (req:Request, res:Response):Promise<void> => {
    const answer = await create(req.body);
    if (typeof answer === "string") {
        res.status(400).json({message: answer});

    } else {
        res.status(201).json(answer);
    }
});

coursesRouter.get("/", async (req:Request, res:Response):Promise<void> => {
    const answer = await getAll(coursesCollection);
    res.status(200).render("courses-page",{list:answer});
});

coursesRouter.get("/:id", checkAuth, async (req:Request, res:Response):Promise<void> => {
    const {id} = req.params;
    const user = await findById(req.user?.id, usersCollection);
    const course = await findById(id,coursesCollection);
    const author=req["user"]?.id === course.authorId;
    //res.status(200).send(answer);
    res.render("course-detail",{
        user,course,author
    });
});

coursesRouter.get("/author/:id", async (req:Request, res:Response):Promise<void> => {
    const {id} = req.params;
    const answer = await findByAuthorId(id,coursesCollection);
    res.status(200).send(answer);
});

coursesRouter.patch("/:id", async (req:Request, res:Response):Promise<void> => {
    const answer = await updateOne(req.params.id,req.body,coursesCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(201).send(answer);
    }
});

coursesRouter.delete("/:id", async (req:Request, res:Response):Promise<void> => {
    const answer = await deleteOne(req.params.id,coursesCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(200).send(answer);
    }
});

export default coursesRouter;