import { usersCollection, coursesCollection, reviewsCollection } from "./database.service";
import { ObjectId } from "mongodb";
export const create = async (body) => {
    const { title, message, authorId, courseId } = body;
    const newReview = await reviewsCollection.insertOne({
        title,
        message,
        authorId,
        courseId,
        startedAt: new Date()
    });
    await usersCollection.findOneAndUpdate({ _id: new ObjectId(authorId) }, { $push: { reviews: newReview.insertedId } });
    await coursesCollection.findOneAndUpdate({ _id: new ObjectId(courseId) }, { $push: { reviews: newReview.insertedId } });
    return newReview;
};
