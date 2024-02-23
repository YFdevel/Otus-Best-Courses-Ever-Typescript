import {usersCollection, coursesCollection, reviewsCollection} from "../index.js";
import {ObjectId} from "mongodb";


export const create = async (body) => {
    const {title, message, authorId, courseId} = body;
    const newReview=await reviewsCollection.insertOne({
        title,
        message,
        authorId,
        courseId,
        startedAt: new Date()
    });
    await usersCollection.findOneAndUpdate({_id: new ObjectId(authorId)},  { $push: { comments: newReview.insertedId } });
    await coursesCollection.findOneAndUpdate({_id: new ObjectId(lessonId)},  { $push: { comments: newReview.insertedId } });
    return newReview;
};



