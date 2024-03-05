var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { isImplementsType } from "./isImplementsType";
export const getAll = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.find().toArray();
});
export const findById = (id, collection) => __awaiter(void 0, void 0, void 0, function* () {
    let answer;
    try {
        answer = yield collection.findOne({ _id: new ObjectId(id) });
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return answer;
});
export const findByAuthorId = (id, collection) => __awaiter(void 0, void 0, void 0, function* () {
    let answer;
    try {
        answer = yield collection.find({ authorId: id }).toArray();
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return answer;
});
export const findByLessonId = (id, collection) => __awaiter(void 0, void 0, void 0, function* () {
    let answer;
    try {
        answer = yield collection.find({ lessonId: id }).toArray();
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return answer;
});
export const findByCourseId = (id, collection) => __awaiter(void 0, void 0, void 0, function* () {
    let answer;
    try {
        answer = yield collection.find({ courseId: id }).toArray();
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return answer;
});
export const updateOne = (id, data, collection) => __awaiter(void 0, void 0, void 0, function* () {
    const example = yield findById(id, collection);
    if (isImplementsType(data) && data["password"]) {
        data["password"] = yield bcrypt.hashSync(data["password"], 7);
    }
    let exampleUpdated;
    try {
        exampleUpdated = yield collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: Object.assign(Object.assign({}, example), data) });
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return exampleUpdated;
});
export const deleteOne = (id, collection) => __awaiter(void 0, void 0, void 0, function* () {
    let answer;
    try {
        answer = yield collection.deleteOne({ _id: new ObjectId(id) });
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return answer;
});
export const getLinkOfCollections = (initial, linked) => {
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
