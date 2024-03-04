"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsGroupByLesson = exports.create = void 0;
const database_service_1 = require("./database.service");
const mongodb_1 = require("mongodb");
const fileService_1 = require("../handlers/fileService");
const create = async (body, files) => {
    let videoFileName;
    let textFileName;
    if (files !== undefined && files !== null) {
        videoFileName = await fileService_1.FileService.saveVideoFile(files["video"]);
        textFileName = files["text"] ? await fileService_1.FileService.saveVideoFile(files["video"]) : "";
    }
    const { title, description, authorId, courseId } = body;
    const lesson = await database_service_1.lessonsCollection.findOne({ title, courseId });
    if (lesson) {
        return "Урок с таким названием уже зарегистрирован";
    }
    const newLesson = await database_service_1.lessonsCollection.insertOne({
        title,
        description,
        authorId,
        courseId,
        videoUrl: videoFileName ? videoFileName.toString() : "",
        pdfUrl: textFileName ? textFileName.toString() : "",
        startedAt: new Date(),
        updatedAt: new Date(),
        comments: []
    });
    await database_service_1.usersCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(authorId) }, { $push: { lessons: newLesson.insertedId } });
    await database_service_1.coursesCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(courseId) }, { $push: { lessons: newLesson.insertedId } });
    return newLesson;
};
exports.create = create;
const getCommentsGroupByLesson = async (id) => {
    const results = await database_service_1.commentsCollection.aggregate([
        { $match: { courseId: id } },
        { $group: { _id: '$lessonId',
                amount: { $sum: 1 },
                info: {
                    $push: {
                        title: "$title",
                        message: "$message"
                    }
                }
            }
        }
    ]).toArray();
    return results;
};
exports.getCommentsGroupByLesson = getCommentsGroupByLesson;
