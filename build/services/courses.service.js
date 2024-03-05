var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { coursesCollection, usersCollection } from "./database.service";
import { findById } from "../handlers/servicesHandlers";
import { ObjectId } from "mongodb";
export const create = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, duration, authorId } = body;
    const course = yield coursesCollection.findOne({ title });
    const author = yield findById(authorId, usersCollection);
    if (course) {
        return "Курс с таким названием уже зарегистрирован";
    }
    const newCourse = yield coursesCollection.insertOne({
        title,
        description,
        authorId,
        authorFirstName: `${author.firstName}`,
        authorLastName: `${author.lastName}`,
        duration,
        price,
        startedAt: new Date(),
        updatedAt: new Date(),
        lessons: [],
        reviews: []
    });
    yield usersCollection.findOneAndUpdate({ _id: new ObjectId(authorId) }, { $push: { courses: newCourse.insertedId } });
    return newCourse;
});
