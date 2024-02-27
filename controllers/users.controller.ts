import express, {NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import {create} from "../services/users.service";
import {usersCollection, refreshSessionsCollection,coursesCollection} from "../services/database.service";
import {getAll, findById, updateOne, deleteOne,findByAuthorId} from "../handlers/servicesHandlers";
import {
    ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_EXPIRATION,
    ACCESS_COOKIE_SETTINGS,
    REFRESH_COOKIE_SETTINGS
} from "../constants/cookies";
import {checkAuth, checkRole} from "../handlers/checkAccess";
import {ROLES} from "../constants/roles";
import {login,logout, avatarDownload} from "../services/users.service";
import {CookieOptions} from "express";
import {Document} from "mongodb";


dotenv.config();
const usersRouter = express.Router();

usersRouter.post("/", async (req:Request, res:Response):Promise<void> => {
    const answer = await create(req.body);
    if (typeof answer === "string") {
        res.status(400).json({message: answer});

    } else {
        res.status(201).json(answer);
    }
});

usersRouter.post('/login', async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        const answer = await login(req.body);
        if (answer) {
            const{accessToken, refreshToken}=answer;
            res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_SETTINGS as CookieOptions);
            res.cookie('accessToken', accessToken, ACCESS_COOKIE_SETTINGS as CookieOptions);
            res.cookie('auth', true, {
                maxAge: 24 * 3600 * 1000
            });
            res.status(201).json({
                accessToken,
                refreshToken,
                accessTokenExpiration: ACCESS_TOKEN_EXPIRATION
            });
        } else {
            res.status(400).send('Не верный логин или пароль!');
        }
    } catch (err) {
        next(err);
    }
});

usersRouter.get("/logout", async(req:Request, res:Response,next:NextFunction):Promise<void> => {
    try {
        await logout(req.cookies.refreshToken);
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        res.clearCookie("auth");
        return res.redirect("/");
    } catch (err) {
        next(err);
    }
});

usersRouter.get("/", async (req:Request, res:Response):Promise<void> => {
    const answer = await getAll(usersCollection);
    res.status(200).send(answer);
});

usersRouter.get("/profile", checkAuth, async (req:Request, res:Response):Promise<void> => {
    const currentUser:Document = await findById(req["user"]?.id, usersCollection);
    const currentUserCourses=await findByAuthorId(req["user"]?.id, coursesCollection);
    res.render("profile",{
        user:currentUser,
        courses: currentUserCourses
    });
});

usersRouter.get("/:id", async (req:Request, res:Response):Promise<void> => {
    const {id} = req.params;
    const answer = await findById(id, usersCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(200).send(answer);
    }

});


usersRouter.patch("/:id", async (req:Request, res:Response):Promise<void> => {
    const answer = await updateOne(req.params.id, req.body, usersCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(201).send(answer);
    }
});

usersRouter.patch("/avatar/:id", async (req:Request, res:Response):Promise<void> => {
    const answer = await avatarDownload(req.params.id, req["files"]);
    if(!answer){
        res.sendStatus(400);
    }else{
        res.status(201).send(answer);
    }
});


usersRouter.delete("/:id", checkAuth, checkRole(ROLES.ADMIN), async (req:Request, res:Response):Promise<void>=> {
    const answer = await deleteOne(req.params.id, usersCollection);
    if(!answer){
        res.sendStatus(404);
    }else{
        res.status(200).send(answer);
    }
});

export default usersRouter;