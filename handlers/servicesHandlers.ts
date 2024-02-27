import {ObjectId} from "mongodb";
import bcrypt from "bcryptjs";
import {Document, DeleteResult, UpdateResult} from "mongodb";
import {IUserUpdateDto} from "../dto/user.dto";
import {isImplementsType} from "./isImplementsType";

export const getAll = async (collection:Document):Promise<Array<Document>> => {
    return await collection.find().toArray();
};
export const findById = async (id:string, collection:Document):Promise<Document> => {
    let answer;
    try{
        answer=await collection.findOne({_id: new ObjectId(id)});
    }catch(err: ReturnType<any>){
        console.log(err?.message)
    }
    return answer;
};

export const findByAuthorId = async (id:string,collection:Document):Promise<Document> => {
    let answer;
    try{
        answer=await collection.find({authorId:id}).toArray();
    }catch(err: ReturnType<any>){
        console.log(err?.message)
    }
    return answer;
};

export const findByLessonId = async (id:string,collection:Document):Promise<Document> => {
    let answer;
    try{
        answer=await collection.find({lessonId:id}).toArray();
    }catch(err: ReturnType<any>){
        console.log(err?.message)
    }
    return answer;
};

export const findByCourseId = async (id:string,collection:Document):Promise<Document> => {
    let answer;
    try{
        answer=await collection.find({courseId:id}).toArray();
    }catch(err: ReturnType<any>){
        console.log(err?.message)
    }
    return answer;
};

export const updateOne = async (id:string,data:unknown,collection:Document):Promise<UpdateResult> => {
    const example=await findById(id,collection);
    if(isImplementsType<IUserUpdateDto>(data)  && data["password"]){
        data["password"]= await bcrypt.hashSync(<string>data["password"], 7);
    }
    let exampleUpdated;
    try{
        exampleUpdated=await collection.findOneAndUpdate({_id: new ObjectId(id)}, { $set: {...example,...data as Object}});
    }catch(err: ReturnType<any>){
        console.log(err?.message)
    }
    return exampleUpdated;
};

export const deleteOne = async (id:string,collection:Document):Promise<DeleteResult> => {
    let answer;
    try{
        answer=await collection.deleteOne({_id: new ObjectId(id)});
    }catch(err: ReturnType<any>){
        console.log(err?.message)
    }
    return answer;
};

export const getLinkOfCollections =  (initial:Document,linked:any):Promise<Document> => {
    const result = initial.map((initialItem:Document) => {
        for (const linkedItem of linked) {
            if (String(initialItem._id) === String(linkedItem._id)) {
                initialItem.comments = linkedItem.info;
            }
        }
        return initialItem;
    });
    return result;
};