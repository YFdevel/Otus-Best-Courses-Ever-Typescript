import bcrypt from "bcryptjs";
import {ROLES} from "../constants/roles.js";
import {usersCollection,refreshSessionsCollection} from "../index.js";
import {isValidPassword} from "../handlers/checkAccess.js";
import jwt from "jsonwebtoken";
import {ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION} from "../constants/cookies.js";
import {FileService} from "../handlers/fileService.js"
import {updateOne} from "../handlers/servicesHandlers.js";


export const create = async (body) => {
    const {firstName, lastName, email, password} = body;
    const user = await usersCollection.findOne({email});
    if (user) {
        return "Пользователь с таким email уже зарегистрирован";
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    return await usersCollection.insertOne({
        firstName,
        lastName,
        age: null,
        avatar: "",
        isBanned: false,
        registerAt: new Date(),
        email,
        password: hashPassword,
        roles: [ROLES.USER],
        courses:[],
        lessons:[],
        comments: [],
        reviews: []
    });
};

export const login = async (body,fingerprint) => {
    const results=await usersCollection.findOne({email:body.email});
    if (results && isValidPassword(results, body.password)) {
        let payload = {
            id: results._id
        };
        let accessToken = jwt.sign(payload, process.env.SECRET, {expiresIn: ACCESS_TOKEN_EXPIRATION / 1000});
        let refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRATION / 1000});
        await refreshSessionsCollection.insertOne({
            userId: results._id,
            refreshToken,
            fingerprint: fingerprint.hash
        });
        return {accessToken,refreshToken}
    }
    return null;
};

export const logout = async (refreshToken) => {
    const result=await refreshSessionsCollection.deleteOne({ refreshToken });
    console.log(result);
};

export const refresh = async (refreshToken,fingerprint) => {
    try {
        if (!refreshToken) {
            return null;
        }
        const result = await refreshSessionsCollection.findOne({refreshToken});
        if (result) {
            // if (result.fingerprint !== fingerprint.hash) {
            //     return null;
            // }
            await refreshSessionsCollection.deleteOne({refreshToken});
            const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
                let payload = {
                    id: decodedToken.id
                };
                 let newAccessToken = jwt.sign(payload, process.env.SECRET, {expiresIn: ACCESS_TOKEN_EXPIRATION / 1000});
                 let newRefreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRATION / 1000});
                await refreshSessionsCollection.insertOne({
                    userId: decodedToken.id,
                    refreshToken:newRefreshToken,
                    fingerprint: fingerprint.hash
                });
                 return {accessToken:newAccessToken,refreshToken:newRefreshToken}
        }
    }catch(err){
        console.log(err.message);
    }
     return null;
};

export const avatarDownload = async (id,files) => {
    const fileName = await FileService.saveImageFile(files.avatar);
    await updateOne(id,{avatar:fileName.toString()}, usersCollection);
    return fileName;
};



