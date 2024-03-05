var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as mongodb from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
const connection = new mongodb.MongoClient(process.env.MONGO_AUTH_STRING);
const db = connection.db("courses");
export const usersCollection = db.collection("users");
export const coursesCollection = db.collection("courses");
export const lessonsCollection = db.collection("lessons");
export const commentsCollection = db.collection("comments");
export const reviewsCollection = db.collection("reviews");
export const refreshSessionsCollection = db.collection("refresh_sessions");
export const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connection.connect();
});
