"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const database_service_1 = require("./database.service");
const mongodb_1 = require("mongodb");
const create = async (body) => {
    const { title, message, authorId, courseId } = body;
    const newReview = await database_service_1.reviewsCollection.insertOne({
        title,
        message,
        authorId,
        courseId,
        startedAt: new Date()
    });
    await database_service_1.usersCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(authorId) }, { $push: { reviews: newReview.insertedId } });
    await database_service_1.coursesCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(courseId) }, { $push: { reviews: newReview.insertedId } });
    return newReview;
};
exports.create = create;
