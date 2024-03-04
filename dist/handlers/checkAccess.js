"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = exports.checkRole = exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_service_1 = require("../services/database.service");
const servicesHandlers_1 = require("./servicesHandlers");
const users_service_1 = require("../services/users.service");
const cookies_1 = require("../constants/cookies");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
async function checkAuth(req, res, next) {
    var _a;
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
            await jsonwebtoken_1.default.verify(token, process.env.SECRET, async (err, result) => {
                if (err) {
                    const answer = await (0, users_service_1.refresh)(req.cookies.refreshToken);
                    if (answer) {
                        const { accessToken, refreshToken } = answer;
                        res.clearCookie("refreshToken");
                        res.clearCookie("accessToken");
                        res.clearCookie("auth");
                        res.cookie('refreshToken', refreshToken, cookies_1.REFRESH_COOKIE_SETTINGS);
                        res.cookie('accessToken', accessToken, cookies_1.ACCESS_COOKIE_SETTINGS);
                        res.cookie('auth', true, {
                            maxAge: cookies_1.ACCESS_TOKEN_EXPIRATION
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
exports.checkAuth = checkAuth;
const checkRole = (role) => async (req, res, next) => {
    var _a;
    const user = await (0, servicesHandlers_1.findById)((_a = req["user"]) === null || _a === void 0 ? void 0 : _a.id, database_service_1.usersCollection);
    if (!user.roles.find((i) => i === role)) {
        res.status(403).json({ message: "Нет доступа" });
    }
    return next();
};
exports.checkRole = checkRole;
const isValidPassword = function (user, password) {
    return bcryptjs_1.default.compareSync(password, user.password);
};
exports.isValidPassword = isValidPassword;
