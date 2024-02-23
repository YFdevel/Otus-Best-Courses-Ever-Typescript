import jwt from "jsonwebtoken";
import {usersCollection} from "../index.js";
import {findById} from "../handlers/servicesHandlers.js";
import {refresh} from "../services/users.service.js";
import {ACCESS_COOKIE_SETTINGS, REFRESH_COOKIE_SETTINGS, ACCESS_TOKEN_EXPIRATION} from "../constants/cookies.js";
import bcrypt from "bcryptjs";


export async function checkAuth(req, res, next) {
    if (!req.headers.authorization && !req.cookies.accessToken) {
        // res.status(401).json({message: "Unauthorized"});
        res.cookie('noAuth', true, {
            maxAge: 30 * 1000
        });
        res.redirect("/");
    } else {
        try {
            const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
            const decodedToken = await jwt.verify(token, process.env.SECRET,
                async (err, result) => {
                    if (err) {
                        const {fingerprint} = req;
                        const answer = await refresh(req.cookies.refreshToken, fingerprint);
                        if (answer) {
                            const {accessToken, refreshToken} = answer;
                            res.clearCookie("refreshToken");
                            res.clearCookie("accessToken");
                            res.clearCookie("auth");
                            res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_SETTINGS);
                            res.cookie('accessToken', accessToken, ACCESS_COOKIE_SETTINGS);
                            res.cookie('auth', true, {
                                maxAge: 24 * 3600 * 1000
                            });
                        }
                        next();
                    }else{
                        req.user=result;
                        next();
                    }
                }
            );
        } catch (TokenExpiredError) {
            res.status(401).json({message: "Unauthorized"});
        }
    }

}


export const checkRole = (role) => async (req, res, next) => {
    console.log(req?.user)
    const user = await findById(req.user?.id, usersCollection);
    if (!user.roles.find(i => i === role)) {
        res.status(403).json({message: "Нет доступа"});
    }

    return next();

};

export const isValidPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password);
};