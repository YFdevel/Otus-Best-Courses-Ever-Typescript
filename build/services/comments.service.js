var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { usersCollection, lessonsCollection, commentsCollection } from "./database.service";
import { findById } from "../handlers/servicesHandlers";
import { ObjectId } from "mongodb";
export const create = (body, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, message, lessonId, courseId } = body;
    const author = yield findById(authorId, usersCollection);
    const newComment = yield commentsCollection.insertOne({
        title,
        message,
        authorId,
        authorFirstName: author === null || author === void 0 ? void 0 : author.firstName,
        authorLastName: author === null || author === void 0 ? void 0 : author.lastName,
        lessonId,
        courseId,
        startedAt: new Date()
    });
    yield usersCollection.findOneAndUpdate({ _id: new ObjectId(authorId) }, { $push: { comments: newComment.insertedId } });
    yield lessonsCollection.findOneAndUpdate({ _id: new ObjectId(lessonId) }, { $push: { comments: newComment.insertedId } });
    return newComment;
});
