"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarDownload = exports.refresh = exports.logout = exports.login = exports.create = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const roles_1 = require("../constants/roles");
const database_service_1 = require("./database.service");
const checkAccess_1 = require("../handlers/checkAccess");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookies_1 = require("../constants/cookies");
const fileService_1 = require("../handlers/fileService");
const servicesHandlers_1 = require("../handlers/servicesHandlers");
const create = async (body) => {
    const { firstName, lastName, email, password } = body;
    const user = await database_service_1.usersCollection.findOne({ email });
    if (user) {
        return "Пользователь с таким email уже зарегистрирован";
    }
    const hashPassword = bcryptjs_1.default.hashSync(password, 7);
    return await database_service_1.usersCollection.insertOne({
        firstName,
        lastName,
        age: null,
        avatar: "",
        isBanned: false,
        registerAt: new Date(),
        email,
        password: hashPassword,
        roles: [roles_1.ROLES.USER],
        courses: [],
        lessons: [],
        comments: [],
        reviews: []
    });
};
exports.create = create;
const login = async (body) => {
    const results = await database_service_1.usersCollection.findOne({ email: body.email });
    if (results && (0, checkAccess_1.isValidPassword)(results, body.password)) {
        let payload = {
            id: results._id
        };
        let accessToken = jsonwebtoken_1.default.sign(payload, process.env.SECRET, { expiresIn: cookies_1.ACCESS_TOKEN_EXPIRATION / 1000 });
        let refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_SECRET, { expiresIn: cookies_1.REFRESH_TOKEN_EXPIRATION / 1000 });
        await database_service_1.refreshSessionsCollection.insertOne({
            userId: results._id,
            refreshToken
        });
        return { accessToken, refreshToken };
    }
    return null;
};
exports.login = login;
const logout = async (refreshToken) => {
    await database_service_1.refreshSessionsCollection.deleteOne({ refreshToken });
};
exports.logout = logout;
const refresh = async (refreshToken) => {
    try {
        const result = await database_service_1.refreshSessionsCollection.findOne({ refreshToken });
        if (result) {
            await database_service_1.refreshSessionsCollection.deleteOne({ refreshToken });
            await jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET);
            let payload = {
                id: result.userId
            };
            let newAccessToken = jsonwebtoken_1.default.sign(payload, process.env.SECRET, { expiresIn: cookies_1.ACCESS_TOKEN_EXPIRATION / 1000 });
            let newRefreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_SECRET, { expiresIn: cookies_1.REFRESH_TOKEN_EXPIRATION / 1000 });
            await database_service_1.refreshSessionsCollection.insertOne({
                userId: result.userId,
                refreshToken: newRefreshToken
            });
            return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        }
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return null;
};
exports.refresh = refresh;
const avatarDownload = async (id, files) => {
    let fileName;
    if (files !== undefined && files !== null) {
        fileName = await fileService_1.FileService.saveImageFile(files["avatar"]);
    }
    await (0, servicesHandlers_1.updateOne)(id, { avatar: fileName ? fileName.toString() : "" }, database_service_1.usersCollection);
    return fileName;
};
exports.avatarDownload = avatarDownload;
