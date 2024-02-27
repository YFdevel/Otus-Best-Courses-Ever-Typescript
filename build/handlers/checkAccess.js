import jwt from "jsonwebtoken";
import { usersCollection } from "../services/database.service";
import { findById } from "./servicesHandlers";
import { refresh } from "../services/users.service";
import { ACCESS_COOKIE_SETTINGS, REFRESH_COOKIE_SETTINGS, ACCESS_TOKEN_EXPIRATION } from "../constants/cookies";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config();
export async function checkAuth(req, res, next) {
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
            const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
            //noinspection TypeScriptValidateTypes
            await jwt.verify(token, process.env.SECRET, async (err, result) => {
                if (err) {
                    const answer = await refresh(req.cookies.refreshToken);
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
            });
        }
        catch (TokenExpiredError) {
            res.status(401).json({ message: "Unauthorized" });
        }
    }
}
export const checkRole = (role) => async (req, res, next) => {
    const user = await findById(req["user"]?.id, usersCollection);
    if (!user.roles.find((i) => i === role)) {
        res.status(403).json({ message: "Нет доступа" });
    }
    return next();
};
export const isValidPassword = function (user, password) {
    return bcrypt.compareSync(password, user.password);
};
