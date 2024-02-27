import {coursesCollection,usersCollection} from "./database.service";
import {findById} from "../handlers/servicesHandlers";
import {ObjectId} from "mongodb";
import {ICourseCreateDto} from "../dto/course.dto";
import {Document, InsertOneResult} from "mongodb";

export const create = async (body:ICourseCreateDto):Promise<Document|string> => {
    const {title, description, price, duration, authorId} = body;
    const course = await coursesCollection.findOne({title});
    const author = await findById(authorId,usersCollection);
    if (course) {
        return "Курс с таким названием уже зарегистрирован";
    }
    const newCourse:Document=await coursesCollection.insertOne({
        title,
        description,
        authorId,
        authorFirstName:`${author.firstName}`,
        authorLastName:`${author.lastName}`,
        duration,
        price,
        startedAt: new Date(),
        updatedAt: new Date(),
        lessons: [],
        reviews: []
    });
    await usersCollection.findOneAndUpdate({_id: new ObjectId(authorId)},  { $push: { courses: newCourse.insertedId } });
    return newCourse;
};
