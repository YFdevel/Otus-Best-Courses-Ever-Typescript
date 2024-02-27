interface Cookie {
    httpOnly:boolean,
    secure:boolean,
    maxAge:number
}
export const ACCESS_COOKIE_SETTINGS:Cookie = {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 3600 * 1000
};

export const REFRESH_COOKIE_SETTINGS:Cookie = {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 3600 * 1000
};

export const ACCESS_TOKEN_EXPIRATION:number = 24 * 3600 * 1000;
export const REFRESH_TOKEN_EXPIRATION:number= 7 * 24 * 3600 * 1000;

