import * as mongodb from "mongodb";
import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";
dotenv.config();

const connection: mongoDB.MongoClient = new mongodb.MongoClient(process.env.MONGO_AUTH_STRING as string);
const db: mongoDB.Db = connection.db("courses");
export const usersCollection = db.collection("users");
export const coursesCollection = db.collection("courses");
export const lessonsCollection = db.collection("lessons");
export const commentsCollection = db.collection("comments");
export const reviewsCollection = db.collection("reviews");
export const refreshSessionsCollection = db.collection("refresh_sessions");

export const connectDatabase = async () => {
    await connection.connect();
};