"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.refreshSessionsCollection = exports.reviewsCollection = exports.commentsCollection = exports.lessonsCollection = exports.coursesCollection = exports.usersCollection = void 0;
const mongodb_1 = __importDefault(require("mongodb"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoClient = new mongodb_1.default.MongoClient(process.env.MONGO_AUTH_STRING);
const db = mongoClient.db("courses");
exports.usersCollection = db.collection("users");
exports.coursesCollection = db.collection("courses");
exports.lessonsCollection = db.collection("lessons");
exports.commentsCollection = db.collection("comments");
exports.reviewsCollection = db.collection("reviews");
exports.refreshSessionsCollection = db.collection("refresh_sessions");
const connectDatabase = async () => {
    await mongoClient.connect();
};
exports.connectDatabase = connectDatabase;
