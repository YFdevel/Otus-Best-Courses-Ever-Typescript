import {usersCollection, coursesCollection, reviewsCollection} from "./database.service";
import {ObjectId,InsertOneResult, Document} from "mongodb";
import {IReviewCreateDto} from "../dto/review.dto";


export const create = async (body:IReviewCreateDto):Promise<Document> => {
    const {title, message, authorId, courseId} = body;
    const newReview:Document=await reviewsCollection.insertOne({
        title,
        message,
        authorId,
        courseId,
        startedAt: new Date()
    });
    await usersCollection.findOneAndUpdate({_id: new ObjectId(authorId)},  { $push: { reviews: newReview.insertedId } });
    await coursesCollection.findOneAndUpdate({_id: new ObjectId(courseId)},  { $push: { reviews: newReview.insertedId } });
    return newReview;
};



