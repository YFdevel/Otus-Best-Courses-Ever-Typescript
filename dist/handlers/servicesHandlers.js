"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkOfCollections = exports.deleteOne = exports.updateOne = exports.findByCourseId = exports.findByLessonId = exports.findByAuthorId = exports.findById = exports.getAll = void 0;
const mongodb_1 = require("mongodb");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const isImplementsType_1 = require("./isImplementsType");
const getAll = async (collection) => {
    return await collection.find().toArray();
};
exports.getAll = getAll;
const findById = async (id, collection) => {
    let answer;
    try {
        answer = await collection.findOne({ _id: new mongodb_1.ObjectId(id) });
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return answer;
};
exports.findById = findById;
const findByAuthorId = async (id, collection) => {
    let answer;
    try {
        answer = await collection.find({ authorId: id }).toArray();
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return answer;
};
exports.findByAuthorId = findByAuthorId;
const findByLessonId = async (id, collection) => {
    let answer;
    try {
        answer = await collection.find({ lessonId: id }).toArray();
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return answer;
};
exports.findByLessonId = findByLessonId;
const findByCourseId = async (id, collection) => {
    let answer;
    try {
        answer = await collection.find({ courseId: id }).toArray();
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return answer;
};
exports.findByCourseId = findByCourseId;
const updateOne = async (id, data, collection) => {
    const example = await (0, exports.findById)(id, collection);
    if ((0, isImplementsType_1.isImplementsType)(data) && data["password"]) {
        data["password"] = await bcryptjs_1.default.hashSync(data["password"], 7);
    }
    let exampleUpdated;
    try {
        exampleUpdated = await collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: Object.assign(Object.assign({}, example), data) });
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return exampleUpdated;
};
exports.updateOne = updateOne;
const deleteOne = async (id, collection) => {
    let answer;
    try {
        answer = await collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    }
    catch (err) {
        console.log(err === null || err === void 0 ? void 0 : err.message);
    }
    return answer;
};
exports.deleteOne = deleteOne;
const getLinkOfCollections = (initial, linked) => {
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
exports.getLinkOfCollections = getLinkOfCollections;
