import MongoClient from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient.MongoClient(process.env.MONGO_AUTH_STRING as string);
const db = mongoClient.db("courses");
export const usersCollection = db.collection("users");
export const coursesCollection = db.collection("courses");
export const lessonsCollection = db.collection("lessons");
export const commentsCollection = db.collection("comments");
export const reviewsCollection = db.collection("reviews");
export const refreshSessionsCollection = db.collection("refresh_sessions");

export const connectDatabase = async () => {
    await mongoClient.connect();
};