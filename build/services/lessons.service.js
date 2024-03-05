var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { coursesCollection, usersCollection, lessonsCollection, commentsCollection } from "./database.service";
import { ObjectId } from "mongodb";
import { FileService } from "../handlers/fileService";
export const create = (body, files) => __awaiter(void 0, void 0, void 0, function* () {
    let videoFileName;
    let textFileName;
    if (files !== undefined && files !== null) {
        videoFileName = yield FileService.saveVideoFile(files["video"]);
        textFileName = files["text"] ? yield FileService.saveVideoFile(files["video"]) : "";
    }
    const { title, description, authorId, courseId } = body;
    const lesson = yield lessonsCollection.findOne({ title, courseId });
    if (lesson) {
        return "Урок с таким названием уже зарегистрирован";
    }
    const newLesson = yield lessonsCollection.insertOne({
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
    yield usersCollection.findOneAndUpdate({ _id: new ObjectId(authorId) }, { $push: { lessons: newLesson.insertedId } });
    yield coursesCollection.findOneAndUpdate({ _id: new ObjectId(courseId) }, { $push: { lessons: newLesson.insertedId } });
    return newLesson;
});
export const getCommentsGroupByLesson = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield commentsCollection.aggregate([
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
});
