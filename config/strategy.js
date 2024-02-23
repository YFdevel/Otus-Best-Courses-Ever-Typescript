import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import passport from "passport";
import passportJWT from "passport-jwt";
import {usersCollection,reviewsCollection} from "../index.js";
import {findById} from "../handlers/servicesHandlers.js";

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

dotenv.config();
const params = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

export const strategy = new Strategy(params, function(payload, done){
    findById(payload.id, usersCollection)
        .then((result)=>{
            console.log(result)
            // if (!result) {
            //     return done(null, false)
            // }
            // else {
            //     return done(null, {
            //         id: result._id
            //     })
            // }

            if (!result) {
                done(null, false);
            } else {
                done(null, result);
            }
        })
        .catch((err)=>{
            return done(err);
        })
});

export const auth = passport.authenticate('jwt', {
    session: false
});

export const isValidPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password);
};