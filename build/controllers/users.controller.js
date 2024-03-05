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
import { config } from "dotenv";
import { create } from "../services/users.service";
import { usersCollection, coursesCollection } from "../services/database.service";
import { getAll, findById, updateOne, deleteOne, findByAuthorId } from "../handlers/servicesHandlers";
import { ACCESS_TOKEN_EXPIRATION, ACCESS_COOKIE_SETTINGS, REFRESH_COOKIE_SETTINGS } from "../constants/cookies";
import { checkAuth, checkRole } from "../handlers/checkAccess";
import { ROLES } from "../constants/roles";
import { login, logout, avatarDownload } from "../services/users.service";
config();
const usersRouter = Router();
usersRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield create(req.body);
    if (typeof answer === "string") {
        res.status(400).json({ message: answer });
    }
    else {
        res.status(201).json(answer);
    }
}));
usersRouter.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answer = yield login(req.body);
        if (answer) {
            const { accessToken, refreshToken } = answer;
            res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_SETTINGS);
            res.cookie('accessToken', accessToken, ACCESS_COOKIE_SETTINGS);
            res.cookie('auth', true, {
                maxAge: 24 * 3600 * 1000
            });
            res.status(201).json({
                accessToken,
                refreshToken,
                accessTokenExpiration: ACCESS_TOKEN_EXPIRATION
            });
        }
        else {
            res.status(400).send('Не верный логин или пароль!');
        }
    }
    catch (err) {
        next(err);
    }
}));
usersRouter.get("/logout", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield logout(req.cookies.refreshToken);
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        res.clearCookie("auth");
        return res.redirect("/");
    }
    catch (err) {
        next(err);
    }
}));
usersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield getAll(usersCollection);
    res.status(200).send(answer);
}));
usersRouter.get("/profile", checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const currentUser = yield findById((_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id, usersCollection);
    const currentUserCourses = yield findByAuthorId((_b = req["user"]) === null || _b === void 0 ? void 0 : _b.id, coursesCollection);
    res.render("profile", {
        user: currentUser,
        courses: currentUserCourses
    });
}));
usersRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const answer = yield findById(id, usersCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
}));
usersRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield updateOne(req.params.id, req.body, usersCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(201).send(answer);
    }
}));
usersRouter.patch("/avatar/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield avatarDownload(req.params.id, req["files"]);
    if (!answer) {
        res.sendStatus(400);
    }
    else {
        res.status(201).send(answer);
    }
}));
usersRouter.delete("/:id", checkAuth, checkRole(ROLES.ADMIN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield deleteOne(req.params.id, usersCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
}));
export default usersRouter;
