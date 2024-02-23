import {ObjectId} from "mongodb";
import bcrypt from "bcryptjs";

export const getAll = async (collection) => {
    return await collection.find().toArray();
};
export const findById = async (id, collection) => {
    let answer;
    try{
        answer=await collection.findOne({_id: new ObjectId(id)});
    }catch(err){
        console.log(err?.message)
    }
    return answer;
};

export const findByAuthorId = async (id,collection) => {
    let answer;
    try{
        answer=await collection.find({authorId:id}).toArray();
    }catch(err){
        console.log(err?.message)
    }
    return answer;
};

export const findByLessonId = async (id,collection) => {
    let answer;
    try{
        answer=await collection.find({lessonId:id}).toArray();
    }catch(err){
        console.log(err?.message)
    }
    return answer;
};

export const findByCourseId = async (id,collection) => {
    let answer;
    try{
        answer=await collection.find({courseId:id}).toArray();
    }catch(err){
        console.log(err?.message)
    }
    return answer;
};

export const updateOne = async (id,data,collection) => {
    const example=await findById(id,collection);
    if(data.password){
        data.password= await bcrypt.hashSync(data.password, 7);
    }
    let exampleUpdated;
    try{
        exampleUpdated=await collection.findOneAndUpdate({_id: new ObjectId(id)}, { $set: {...example,...data}});
    }catch(err){
        console.log(err?.message)
    }
    return exampleUpdated;
};

export const deleteOne = async (id,collection) => {
    let answer;
    try{
        answer=await collection.deleteOne({_id: new ObjectId(id)});
    }catch(err){
        console.log(err?.message)
    }
    return answer;
};

export const getLinkOfCollections =  (initial,linked) => {
    const result = initial.map((initialItem) => {
        for (const linkedItem of linked) {
            if (String(initialItem._id) === String(linkedItem._id)) {
                initialItem.comments = linkedItem.info;
            }
        }
        return initialItem;
    });
    return result;
};