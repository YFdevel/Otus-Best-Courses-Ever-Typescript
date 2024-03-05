var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcryptjs";
import { ROLES } from "../constants/roles";
import { usersCollection, refreshSessionsCollection } from "./database.service";
import { isValidPassword } from "../handlers/checkAccess";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from "../constants/cookies";
import { FileService } from "../handlers/fileService";
import { updateOne } from "../handlers/servicesHandlers";
export const create = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = body;
    const user = yield usersCollection.findOne({ email });
    if (user) {
        return "Пользователь с таким email уже зарегистрирован";
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    return yield usersCollection.insertOne({
        firstName,
        lastName,
        age: null,
        avatar: "",
        isBanned: false,
        registerAt: new Date(),
        email,
        password: hashPassword,
        roles: [ROLES.USER],
        courses: [],
        lessons: [],
        comments: [],
        reviews: []
    });
});
export const login = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield usersCollection.findOne({ email: body.email });
    if (results && isValidPassword(results, body.password)) {
        let payload = {
            id: results._id
        };
        let accessToken = jwt.sign(payload, process.env.SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION / 1000 });
        let refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION / 1000 });
        yield refreshSessionsCollection.insertOne({
            userId: results._id,
            refreshToken
        });
        return { accessToken, refreshToken };
    }
    return null;
});
export const logout = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    yield refreshSessionsCollection.deleteOne({ refreshToken });
});
export const refresh = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield refreshSessionsCollection.findOne({ refreshToken });
        if (result) {
            yield refreshSessionsCollection.deleteOne({ refreshToken });
            yield jwt.verify(refreshToken, process.env.REFRESH_SECRET);
            let payload = {
                id: result.userId
            };
            let newAccessToken = jwt.sign(payload, process.env.SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION / 1000 });
            let newRefreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION / 1000 });
            yield refreshSessionsCollection.insertOne({
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
});
export const avatarDownload = (id, files) => __awaiter(void 0, void 0, void 0, function* () {
    let fileName;
    if (files !== undefined && files !== null) {
        fileName = yield FileService.saveImageFile(files["avatar"]);
    }
    yield updateOne(id, { avatar: fileName ? fileName.toString() : "" }, usersCollection);
    return fileName;
});
