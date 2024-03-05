import {afterAll, beforeAll, describe, test, expect} from "@jest/globals";
import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";
import {Document} from "mongodb";



dotenv.config();

describe('MongoDB', () => {
    const connection: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_AUTH_STRING as string);
    let db: mongoDB.Db;
    beforeAll(async () => {
        db = await connection.db("courses");
    });

    afterAll(async () => {
        await connection.close();
    });

    test('should return all users from collection', async () => {
        const usersCollection = db.collection("users");
        const users = await usersCollection.find().toArray();
        expect(users.length).toBeGreaterThan(0);
    });

    test('should return all courses from collection', async () => {
        const coursesCollection = db.collection("courses");
        const courses = await coursesCollection.find().toArray();
        expect(courses.length).toBeGreaterThan(0);
    });

    test('should return all comments from collection', async () => {
        const commentsCollection = db.collection("comments");
        const comments = await commentsCollection.find().toArray();
        expect(comments.length).toBeGreaterThan(0);
    });

    test('should return all lessons from collection', async () => {
        const lessonsCollection = db.collection("lessons");
        const lessons = await lessonsCollection.find().toArray();
        expect(lessons.length).toBeGreaterThan(0);
    });


    test('should insert and delete user from collection', async () => {
        const usersCollection = db.collection("users");
        const mockUser = {firstName: 'John', lastName: 'Johnson', email: 'example@.google.com', password: '12345'};
        const newUser: Document = await usersCollection.insertOne(mockUser);
        const insertedUser = await usersCollection.findOne({_id: newUser.insertedId});
        expect(insertedUser).toEqual(mockUser);
        const deletedUser=await usersCollection.deleteOne({_id: newUser.insertedId});
        expect(deletedUser).toEqual({ "acknowledged" : true, "deletedCount" : 1 });
    });
});