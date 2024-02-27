import bcrypt from "bcryptjs";
import {ROLES} from "../constants/roles";
import {usersCollection,refreshSessionsCollection} from "./database.service";
import {isValidPassword} from "../handlers/checkAccess";
import jwt, {Secret} from "jsonwebtoken";
import {ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION} from "../constants/cookies";
import {FileService} from "../handlers/fileService"
import {updateOne} from "../handlers/servicesHandlers";
import {IUserCreateDto, IUserLoginDto, IUserTokensDto} from "../dto/user.dto";
import {Document, InsertOneResult} from "mongodb";
import fileUpload, {FileArray, UploadedFile} from "express-fileupload";


export const create = async (body:IUserCreateDto):Promise<InsertOneResult|string> => {
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

export const login = async (body:IUserLoginDto):Promise<IUserTokensDto|null> => {
    const results:Document|null=await usersCollection.findOne({email:body.email});
    if (results && isValidPassword(results, body.password)) {
        let payload = {
            id: results._id
        };
        let accessToken = jwt.sign(payload, process.env.SECRET as Secret , {expiresIn: ACCESS_TOKEN_EXPIRATION / 1000});
        let refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET as Secret, {expiresIn: REFRESH_TOKEN_EXPIRATION / 1000});
        await refreshSessionsCollection.insertOne({
            userId: results._id,
            refreshToken
        });
        return {accessToken,refreshToken}
    }
    return null;
};

export const logout = async (refreshToken:string):Promise<void> => {
  await refreshSessionsCollection.deleteOne({ refreshToken });
};

export const refresh = async (refreshToken:string):Promise<IUserTokensDto|null> => {
    try {
        const result = await refreshSessionsCollection.findOne({refreshToken});
        if (result) {
            await refreshSessionsCollection.deleteOne({refreshToken});
            await jwt.verify(refreshToken, process.env.REFRESH_SECRET as Secret);
                let payload = {
                    id: result.userId
                };
                 let newAccessToken = jwt.sign(payload, process.env.SECRET as Secret, {expiresIn: ACCESS_TOKEN_EXPIRATION / 1000});
                 let newRefreshToken = jwt.sign(payload, process.env.REFRESH_SECRET as Secret, {expiresIn: REFRESH_TOKEN_EXPIRATION / 1000});
                await refreshSessionsCollection.insertOne({
                    userId: result.userId,
                    refreshToken:newRefreshToken
                });
                 return {accessToken:newAccessToken,refreshToken:newRefreshToken}
        }
    }catch(err:ReturnType<any>){
        console.log(err?.message);
    }
     return null;
};

export const avatarDownload = async (id:string,files:FileArray|null|undefined):Promise<string|undefined> => {
    let fileName:string|undefined;
    if(files!==undefined && files!==null){
        fileName =  await FileService.saveImageFile(files["avatar"] as UploadedFile);
    }
    await updateOne(id,{avatar:fileName?fileName.toString():""}, usersCollection);
    return fileName;
};



