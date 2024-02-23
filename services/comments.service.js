import {usersCollection, lessonsCollection, commentsCollection} from "../index.js";
import {findById} from "../handlers/servicesHandlers.js";
import {ObjectId} from "mongodb";


export const create = async (body, authorId) => {
    const {title, message, lessonId, courseId} = body;
    const author=await findById(authorId,usersCollection);
    const newComment=await commentsCollection.insertOne({
        title,
        message,
        authorId,
        authorFirstName:author?.firstName,
        authorLastName:author?.lastName,
        lessonId,
        courseId,
        startedAt: new Date()
    });
    await usersCollection.findOneAndUpdate({_id: new ObjectId(authorId)},  { $push: { comments: newComment.insertedId } });
    await lessonsCollection.findOneAndUpdate({_id: new ObjectId(lessonId)},  { $push: { comments: newComment.insertedId } });
    return newComment;
};

