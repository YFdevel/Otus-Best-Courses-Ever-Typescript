"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var users_service_1 = require("../services/users.service");
var database_service_1 = require("../services/database.service");
var servicesHandlers_1 = require("../handlers/servicesHandlers");
var cookies_1 = require("../constants/cookies");
var checkAccess_1 = require("../handlers/checkAccess");
var roles_1 = require("../constants/roles");
var users_service_2 = require("../services/users.service");
dotenv_1.default.config();
var usersRouter = express_1.default.Router();
usersRouter.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, users_service_1.create)(req.body)];
            case 1:
                answer = _a.sent();
                if (typeof answer === "string") {
                    res.status(400).json({ message: answer });
                }
                else {
                    res.status(201).json(answer);
                }
                return [2 /*return*/];
        }
    });
}); });
usersRouter.post('/login', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var answer, accessToken, refreshToken, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, users_service_2.login)(req.body)];
            case 1:
                answer = _a.sent();
                if (answer) {
                    accessToken = answer.accessToken, refreshToken = answer.refreshToken;
                    res.cookie('refreshToken', refreshToken, cookies_1.REFRESH_COOKIE_SETTINGS);
                    res.cookie('accessToken', accessToken, cookies_1.ACCESS_COOKIE_SETTINGS);
                    res.cookie('auth', true, {
                        maxAge: 24 * 3600 * 1000
                    });
                    res.status(201).json({
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        accessTokenExpiration: cookies_1.ACCESS_TOKEN_EXPIRATION
                    });
                }
                else {
                    res.status(400).send('Не верный логин или пароль!');
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
usersRouter.get("/logout", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, users_service_2.logout)(req.cookies.refreshToken)];
            case 1:
                _a.sent();
                res.clearCookie("refreshToken");
                res.clearCookie("accessToken");
                res.clearCookie("auth");
                return [2 /*return*/, res.redirect("/")];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
usersRouter.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, servicesHandlers_1.getAll)(database_service_1.usersCollection)];
            case 1:
                answer = _a.sent();
                res.status(200).send(answer);
                return [2 /*return*/];
        }
    });
}); });
usersRouter.get("/profile", checkAccess_1.checkAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser, currentUserCourses;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, servicesHandlers_1.findById)((_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id, database_service_1.usersCollection)];
            case 1:
                currentUser = _b.sent();
                return [4 /*yield*/, (0, servicesHandlers_1.findByAuthorId)(req["user"].id, database_service_1.coursesCollection)];
            case 2:
                currentUserCourses = _b.sent();
                res.render("profile", {
                    user: currentUser,
                    courses: currentUserCourses
                });
                return [2 /*return*/];
        }
    });
}); });
usersRouter.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, servicesHandlers_1.findById)(id, database_service_1.usersCollection)];
            case 1:
                answer = _a.sent();
                if (!answer) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200).send(answer);
                }
                return [2 /*return*/];
        }
    });
}); });
usersRouter.patch("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, servicesHandlers_1.updateOne)(req.params.id, req.body, database_service_1.usersCollection)];
            case 1:
                answer = _a.sent();
                if (!answer) {
                    res.sendStatus(404);
                }
                else {
                    res.status(201).send(answer);
                }
                return [2 /*return*/];
        }
    });
}); });
usersRouter.patch("/avatar/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, users_service_2.avatarDownload)(req.params.id, req["files"])];
            case 1:
                answer = _a.sent();
                if (!answer) {
                    res.sendStatus(400);
                }
                else {
                    res.status(201).send(answer);
                }
                return [2 /*return*/];
        }
    });
}); });
usersRouter.delete("/:id", checkAccess_1.checkAuth, (0, checkAccess_1.checkRole)(roles_1.ROLES.ADMIN), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, servicesHandlers_1.deleteOne)(req.params.id, database_service_1.usersCollection)];
            case 1:
                answer = _a.sent();
                if (!answer) {
                    res.sendStatus(404);
                }
                else {
                    res.status(200).send(answer);
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = usersRouter;
