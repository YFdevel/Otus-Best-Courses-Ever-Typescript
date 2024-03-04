"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_service_1 = require("../services/users.service");
const database_service_1 = require("../services/database.service");
const servicesHandlers_1 = require("../handlers/servicesHandlers");
const cookies_1 = require("../constants/cookies");
const checkAccess_1 = require("../handlers/checkAccess");
const roles_1 = require("../constants/roles");
const users_service_2 = require("../services/users.service");
dotenv_1.default.config();
const usersRouter = express_1.default.Router();
usersRouter.post("/", async (req, res) => {
    const answer = await (0, users_service_1.create)(req.body);
    if (typeof answer === "string") {
        res.status(400).json({ message: answer });
    }
    else {
        res.status(201).json(answer);
    }
});
usersRouter.post('/login', async (req, res, next) => {
    try {
        const answer = await (0, users_service_2.login)(req.body);
        if (answer) {
            const { accessToken, refreshToken } = answer;
            res.cookie('refreshToken', refreshToken, cookies_1.REFRESH_COOKIE_SETTINGS);
            res.cookie('accessToken', accessToken, cookies_1.ACCESS_COOKIE_SETTINGS);
            res.cookie('auth', true, {
                maxAge: 24 * 3600 * 1000
            });
            res.status(201).json({
                accessToken,
                refreshToken,
                accessTokenExpiration: cookies_1.ACCESS_TOKEN_EXPIRATION
            });
        }
        else {
            res.status(400).send('Не верный логин или пароль!');
        }
    }
    catch (err) {
        next(err);
    }
});
usersRouter.get("/logout", async (req, res, next) => {
    try {
        await (0, users_service_2.logout)(req.cookies.refreshToken);
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        res.clearCookie("auth");
        return res.redirect("/");
    }
    catch (err) {
        next(err);
    }
});
usersRouter.get("/", async (req, res) => {
    const answer = await (0, servicesHandlers_1.getAll)(database_service_1.usersCollection);
    res.status(200).send(answer);
});
usersRouter.get("/profile", checkAccess_1.checkAuth, async (req, res) => {
    var _a, _b;
    const currentUser = await (0, servicesHandlers_1.findById)((_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id, database_service_1.usersCollection);
    const currentUserCourses = await (0, servicesHandlers_1.findByAuthorId)((_b = req["user"]) === null || _b === void 0 ? void 0 : _b.id, database_service_1.coursesCollection);
    res.render("profile", {
        user: currentUser,
        courses: currentUserCourses
    });
});
usersRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const answer = await (0, servicesHandlers_1.findById)(id, database_service_1.usersCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
});
usersRouter.patch("/:id", async (req, res) => {
    const answer = await (0, servicesHandlers_1.updateOne)(req.params.id, req.body, database_service_1.usersCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(201).send(answer);
    }
});
usersRouter.patch("/avatar/:id", async (req, res) => {
    const answer = await (0, users_service_2.avatarDownload)(req.params.id, req["files"]);
    if (!answer) {
        res.sendStatus(400);
    }
    else {
        res.status(201).send(answer);
    }
});
usersRouter.delete("/:id", checkAccess_1.checkAuth, (0, checkAccess_1.checkRole)(roles_1.ROLES.ADMIN), async (req, res) => {
    const answer = await (0, servicesHandlers_1.deleteOne)(req.params.id, database_service_1.usersCollection);
    if (!answer) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(answer);
    }
});
exports.default = usersRouter;
