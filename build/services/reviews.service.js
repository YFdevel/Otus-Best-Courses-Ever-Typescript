var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { usersCollection, coursesCollection, reviewsCollection } from "./database.service";
import { ObjectId } from "mongodb";
export const create = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, message, authorId, courseId } = body;
    const newReview = yield reviewsCollection.insertOne({
        title,
        message,
        authorId,
        courseId,
        startedAt: new Date()
    });
    yield usersCollection.findOneAndUpdate({ _id: new ObjectId(authorId) }, { $push: { reviews: newReview.insertedId } });
    yield coursesCollection.findOneAndUpdate({ _id: new ObjectId(courseId) }, { $push: { reviews: newReview.insertedId } });
    return newReview;
});
