import { coursesCollection, usersCollection, lessonsCollection, commentsCollection } from "./database.service";
import { ObjectId } from "mongodb";
import { FileService } from "../handlers/fileService";
export const create = async (body, files) => {
    let videoFileName;
    let textFileName;
    if (files !== undefined && files !== null) {
        videoFileName = await FileService.saveVideoFile(files["video"]);
        textFileName = files["text"] ? await FileService.saveVideoFile(files["video"]) : "";
    }
    const { title, description, authorId, courseId } = body;
    const lesson = await lessonsCollection.findOne({ title, courseId });
    if (lesson) {
        return "Урок с таким названием уже зарегистрирован";
    }
    const newLesson = await lessonsCollection.insertOne({
        title,
        description,
        authorId,
        courseId,
        videoUrl: videoFileName ? videoFileName.toString() : "",
        pdfUrl: textFileName ? textFileName.toString() : "",
        startedAt: new Date(),
        updatedAt: new Date(),
        comments: []
    });
    await usersCollection.findOneAndUpdate({ _id: new ObjectId(authorId) }, { $push: { lessons: newLesson.insertedId } });
    await coursesCollection.findOneAndUpdate({ _id: new ObjectId(courseId) }, { $push: { lessons: newLesson.insertedId } });
    return newLesson;
};
export const getCommentsGroupByLesson = async (id) => {
    const results = await commentsCollection.aggregate([
        { $match: { courseId: id } },
        { $group: { _id: '$lessonId',
                amount: { $sum: 1 },
                info: {
                    $push: {
                        title: "$title",
                        message: "$message"
                    }
                }
            }
        }
    ]).toArray();
    return results;
};
