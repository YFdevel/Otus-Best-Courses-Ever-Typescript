var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import { usersCollection } from "../services/database.service";
import { findById } from "./servicesHandlers";
import { refresh } from "../services/users.service";
import { ACCESS_COOKIE_SETTINGS, REFRESH_COOKIE_SETTINGS, ACCESS_TOKEN_EXPIRATION } from "../constants/cookies";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config();
export function checkAuth(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.authorization && !req.cookies.accessToken) {
            // res.status(401).json({message: "Unauthorized"});
            res.cookie('noAuth', true, {
                maxAge: 30 * 1000
            });
            res.redirect("/");
        }
        else {
            try {
                //noinspection TypeScriptValidateTypes
                const token = req.cookies.accessToken || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
                //noinspection TypeScriptValidateTypes
                yield jwt.verify(token, process.env.SECRET, (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        const answer = yield refresh(req.cookies.refreshToken);
                        if (answer) {
                            const { accessToken, refreshToken } = answer;
                            res.clearCookie("refreshToken");
                            res.clearCookie("accessToken");
                            res.clearCookie("auth");
                            res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_SETTINGS);
                            res.cookie('accessToken', accessToken, ACCESS_COOKIE_SETTINGS);
                            res.cookie('auth', true, {
                                maxAge: ACCESS_TOKEN_EXPIRATION
                            });
                        }
                        next();
                    }
                    else {
                        req["user"] = result;
                        next();
                    }
                }));
            }
            catch (TokenExpiredError) {
                res.status(401).json({ message: "Unauthorized" });
            }
        }
    });
}
export const checkRole = (role) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield findById((_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id, usersCollection);
    if (!user.roles.find((i) => i === role)) {
        res.status(403).json({ message: "Нет доступа" });
    }
    return next();
});
export const isValidPassword = function (user, password) {
    return bcrypt.compareSync(password, user.password);
};
