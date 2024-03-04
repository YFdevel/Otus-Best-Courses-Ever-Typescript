"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const database_service_1 = require("./database.service");
const servicesHandlers_1 = require("../handlers/servicesHandlers");
const mongodb_1 = require("mongodb");
const create = async (body, authorId) => {
    const { title, message, lessonId, courseId } = body;
    const author = await (0, servicesHandlers_1.findById)(authorId, database_service_1.usersCollection);
    const newComment = await database_service_1.commentsCollection.insertOne({
        title,
        message,
        authorId,
        authorFirstName: author === null || author === void 0 ? void 0 : author.firstName,
        authorLastName: author === null || author === void 0 ? void 0 : author.lastName,
        lessonId,
        courseId,
        startedAt: new Date()
    });
    await database_service_1.usersCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(authorId) }, { $push: { comments: newComment.insertedId } });
    await database_service_1.lessonsCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(lessonId) }, { $push: { comments: newComment.insertedId } });
    return newComment;
};
exports.create = create;
