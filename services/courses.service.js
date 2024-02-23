import {coursesCollection,usersCollection} from "../index.js";
import {findById} from "../handlers/servicesHandlers.js";
import {ObjectId} from "mongodb";


export const create = async (body) => {
    const {title, description, price, duration, authorId} = body;
    const course = await coursesCollection.findOne({title});
    const author = await findById(authorId,usersCollection);
    if (course) {
        return "Курс с таким названием уже зарегистрирован";
    }
    const newCourse=await coursesCollection.insertOne({
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


