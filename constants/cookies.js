"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_EXPIRATION = exports.ACCESS_TOKEN_EXPIRATION = exports.REFRESH_COOKIE_SETTINGS = exports.ACCESS_COOKIE_SETTINGS = void 0;
exports.ACCESS_COOKIE_SETTINGS = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 3600 * 1000
};
exports.REFRESH_COOKIE_SETTINGS = {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 3600 * 1000
};
exports.ACCESS_TOKEN_EXPIRATION = 24 * 3600 * 1000;
exports.REFRESH_TOKEN_EXPIRATION = 7 * 24 * 3600 * 1000;
