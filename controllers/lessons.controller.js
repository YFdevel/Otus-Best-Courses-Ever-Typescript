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
var lessons_service_1 = require("../services/lessons.service");
var database_service_1 = require("../services/database.service");
var servicesHandlers_1 = require("../handlers/servicesHandlers");
var checkAccess_1 = require("../handlers/checkAccess");
var lessonsRouter = express_1.default.Router();
lessonsRouter.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, lessons_service_1.create)(req.body, req["files"])];
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
lessonsRouter.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, servicesHandlers_1.getAll)(database_service_1.lessonsCollection)];
            case 1:
                answer = _a.sent();
                res.status(200).send(answer);
                return [2 /*return*/];
        }
    });
}); });
lessonsRouter.get("/create/:courseId", checkAccess_1.checkAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        res.status(200).render("lesson-create", {
            authorId: (_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id,
            courseId: req.params.courseId
        });
        return [2 /*return*/];
    });
}); });
lessonsRouter.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, servicesHandlers_1.findById)(id, database_service_1.lessonsCollection)];
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
lessonsRouter.get("/author/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, servicesHandlers_1.findByAuthorId)(id, database_service_1.lessonsCollection)];
            case 1:
                answer = _a.sent();
                res.status(200).send(answer);
                return [2 /*return*/];
        }
    });
}); });
lessonsRouter.get("/course/:id", checkAccess_1.checkAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, initialLessons, comments, lessons;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, servicesHandlers_1.findByCourseId)(id, database_service_1.lessonsCollection)];
            case 1:
                initialLessons = _b.sent();
                return [4 /*yield*/, (0, lessons_service_1.getCommentsGroupByLesson)(id)];
            case 2:
                comments = _b.sent();
                lessons = (0, servicesHandlers_1.getLinkOfCollections)(initialLessons, comments);
                res.status(200).render("lessons-page", {
                    courseId: id,
                    lessons: lessons,
                    authorId: (_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id
                });
                return [2 /*return*/];
        }
    });
}); });
lessonsRouter.patch("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, servicesHandlers_1.updateOne)(req.params.id, req.body, database_service_1.lessonsCollection)];
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
lessonsRouter.delete("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, servicesHandlers_1.deleteOne)(req.params.id, database_service_1.lessonsCollection)];
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
exports.default = lessonsRouter;
