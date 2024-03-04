"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const database_service_1 = require("./database.service");
const servicesHandlers_1 = require("../handlers/servicesHandlers");
const mongodb_1 = require("mongodb");
const create = async (body) => {
    const { title, description, price, duration, authorId } = body;
    const course = await database_service_1.coursesCollection.findOne({ title });
    const author = await (0, servicesHandlers_1.findById)(authorId, database_service_1.usersCollection);
    if (course) {
        return "Курс с таким названием уже зарегистрирован";
    }
    const newCourse = await database_service_1.coursesCollection.insertOne({
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
    await database_service_1.usersCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(authorId) }, { $push: { courses: newCourse.insertedId } });
    return newCourse;
};
exports.create = create;
