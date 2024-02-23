export const ACCESS_COOKIE_SETTINGS = {
    REFRESH_TOKEN: {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 1000
    },
};

export const REFRESH_COOKIE_SETTINGS = {
    REFRESH_TOKEN: {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 3600 * 1000
    },
};

export const ACCESS_TOKEN_EXPIRATION = 60 * 1000;
export const REFRESH_TOKEN_EXPIRATION = 7 * 24 * 3600 * 1000;