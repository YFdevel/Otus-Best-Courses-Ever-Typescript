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
exports.avatarDownload = exports.refresh = exports.logout = exports.login = exports.create = void 0;
var bcryptjs_1 = require("bcryptjs");
var roles_1 = require("../constants/roles");
var database_service_1 = require("./database.service");
var checkAccess_1 = require("../handlers/checkAccess");
var jsonwebtoken_1 = require("jsonwebtoken");
var cookies_1 = require("../constants/cookies");
var fileService_1 = require("../handlers/fileService");
var servicesHandlers_1 = require("../handlers/servicesHandlers");
var create = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var firstName, lastName, email, password, user, hashPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                firstName = body.firstName, lastName = body.lastName, email = body.email, password = body.password;
                return [4 /*yield*/, database_service_1.usersCollection.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, "Пользователь с таким email уже зарегистрирован"];
                }
                hashPassword = bcryptjs_1.default.hashSync(password, 7);
                return [4 /*yield*/, database_service_1.usersCollection.insertOne({
                        firstName: firstName,
                        lastName: lastName,
                        age: null,
                        avatar: "",
                        isBanned: false,
                        registerAt: new Date(),
                        email: email,
                        password: hashPassword,
                        roles: [roles_1.ROLES.USER],
                        courses: [],
                        lessons: [],
                        comments: [],
                        reviews: []
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.create = create;
var login = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var results, payload, accessToken, refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_service_1.usersCollection.findOne({ email: body.email })];
            case 1:
                results = _a.sent();
                if (!(results && (0, checkAccess_1.isValidPassword)(results, body.password))) return [3 /*break*/, 3];
                payload = {
                    id: results._id
                };
                accessToken = jsonwebtoken_1.default.sign(payload, process.env.SECRET, { expiresIn: cookies_1.ACCESS_TOKEN_EXPIRATION / 1000 });
                refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_SECRET, { expiresIn: cookies_1.REFRESH_TOKEN_EXPIRATION / 1000 });
                return [4 /*yield*/, database_service_1.refreshSessionsCollection.insertOne({
                        userId: results._id,
                        refreshToken: refreshToken
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, { accessToken: accessToken, refreshToken: refreshToken }];
            case 3: return [2 /*return*/, null];
        }
    });
}); };
exports.login = login;
var logout = function (refreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_service_1.refreshSessionsCollection.deleteOne({ refreshToken: refreshToken })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.logout = logout;
var refresh = function (refreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    var result, payload, newAccessToken, newRefreshToken, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, database_service_1.refreshSessionsCollection.findOne({ refreshToken: refreshToken })];
            case 1:
                result = _a.sent();
                if (!result) return [3 /*break*/, 5];
                return [4 /*yield*/, database_service_1.refreshSessionsCollection.deleteOne({ refreshToken: refreshToken })];
            case 2:
                _a.sent();
                return [4 /*yield*/, jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET)];
            case 3:
                _a.sent();
                payload = {
                    id: result.userId
                };
                newAccessToken = jsonwebtoken_1.default.sign(payload, process.env.SECRET, { expiresIn: cookies_1.ACCESS_TOKEN_EXPIRATION / 1000 });
                newRefreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_SECRET, { expiresIn: cookies_1.REFRESH_TOKEN_EXPIRATION / 1000 });
                return [4 /*yield*/, database_service_1.refreshSessionsCollection.insertOne({
                        userId: result.userId,
                        refreshToken: newRefreshToken
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/, { accessToken: newAccessToken, refreshToken: newRefreshToken }];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                console.log(err_1.message);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, null];
        }
    });
}); };
exports.refresh = refresh;
var avatarDownload = function (id, files) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fileService_1.FileService.saveImageFile(files.avatar)];
            case 1:
                fileName = _a.sent();
                return [4 /*yield*/, (0, servicesHandlers_1.updateOne)(id, { avatar: fileName.toString() }, database_service_1.usersCollection)];
            case 2:
                _a.sent();
                return [2 /*return*/, fileName];
        }
    });
}); };
exports.avatarDownload = avatarDownload;
