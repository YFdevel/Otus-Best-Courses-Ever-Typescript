import {coursesCollection, usersCollection, lessonsCollection,commentsCollection} from "./database.service";
import {ObjectId} from "mongodb";
import {FileService} from "../handlers/fileService"
import {ILessonCreateDto} from "../dto/lesson.dto";
import {FileArray, UploadedFile} from "express-fileupload";
import {InsertOneResult, Document} from "mongodb";


export const create = async (body:ILessonCreateDto,files:FileArray|null|undefined):Promise<Document|string> => {
    let videoFileName:string|undefined;
    let textFileName:string|undefined;
    if(files!==undefined && files!==null){
        videoFileName =  await FileService.saveVideoFile(files["video"] as UploadedFile);
        textFileName =  files["text"]?await FileService.saveVideoFile(files["video"] as UploadedFile):"";
    }
    const {title, description, authorId, courseId} = body;
    const lesson = await lessonsCollection.findOne({title,courseId});
    if (lesson) {
        return "Урок с таким названием уже зарегистрирован";
    }
    const newLesson:Document=await lessonsCollection.insertOne({
        title,
        description,
        authorId,
        courseId,
        videoUrl: videoFileName?videoFileName.toString():"",
        pdfUrl: textFileName?textFileName.toString():"",
        startedAt: new Date(),
        updatedAt: new Date(),
        comments: []
    });
    await usersCollection.findOneAndUpdate({_id: new ObjectId(authorId)},  { $push: { lessons: newLesson.insertedId } });
    await coursesCollection.findOneAndUpdate({_id: new ObjectId(courseId)},  { $push: { lessons: newLesson.insertedId } });
    return newLesson;
};

export const getCommentsGroupByLesson = async (id:string):Promise<Document>=> {
    const results:Document=await commentsCollection.aggregate([
        { $match:{courseId:id}},
        { $group:
                { _id:'$lessonId',
                    amount: { $sum:1 },
                    info: {
                        $push: {
                            title:"$title",
                            message: "$message"
                        }
                    }
                }
        }

    ]).toArray();
    return results;
};
