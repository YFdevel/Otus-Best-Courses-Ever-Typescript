"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkOfCollections = exports.deleteOne = exports.updateOne = exports.findByCourseId = exports.findByLessonId = exports.findByAuthorId = exports.findById = exports.getAll = void 0;
var mongodb_1 = require("mongodb");
var bcryptjs_1 = require("bcryptjs");
var getAll = function (collection) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, collection.find().toArray()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getAll = getAll;
var findById = function (id, collection) { return __awaiter(void 0, void 0, void 0, function () {
    var answer, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, collection.findOne({ _id: new mongodb_1.ObjectId(id) })];
            case 1:
                answer = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1 === null || err_1 === void 0 ? void 0 : err_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, answer];
        }
    });
}); };
exports.findById = findById;
var findByAuthorId = function (id, collection) { return __awaiter(void 0, void 0, void 0, function () {
    var answer, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, collection.find({ authorId: id }).toArray()];
            case 1:
                answer = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log(err_2 === null || err_2 === void 0 ? void 0 : err_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, answer];
        }
    });
}); };
exports.findByAuthorId = findByAuthorId;
var findByLessonId = function (id, collection) { return __awaiter(void 0, void 0, void 0, function () {
    var answer, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, collection.find({ lessonId: id }).toArray()];
            case 1:
                answer = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.log(err_3 === null || err_3 === void 0 ? void 0 : err_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, answer];
        }
    });
}); };
exports.findByLessonId = findByLessonId;
var findByCourseId = function (id, collection) { return __awaiter(void 0, void 0, void 0, function () {
    var answer, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, collection.find({ courseId: id }).toArray()];
            case 1:
                answer = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.log(err_4 === null || err_4 === void 0 ? void 0 : err_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, answer];
        }
    });
}); };
exports.findByCourseId = findByCourseId;
var updateOne = function (id, data, collection) { return __awaiter(void 0, void 0, void 0, function () {
    var example, _a, _b, exampleUpdated, err_5;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, exports.findById)(id, collection)];
            case 1:
                example = _c.sent();
                if (!data["password"]) return [3 /*break*/, 3];
                _a = data;
                _b = "password";
                return [4 /*yield*/, bcryptjs_1.default.hashSync(data["password"], 7)];
            case 2:
                _a[_b] = _c.sent();
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: __assign(__assign({}, example), data) })];
            case 4:
                exampleUpdated = _c.sent();
                return [3 /*break*/, 6];
            case 5:
                err_5 = _c.sent();
                console.log(err_5 === null || err_5 === void 0 ? void 0 : err_5.message);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/, exampleUpdated];
        }
    });
}); };
exports.updateOne = updateOne;
var deleteOne = function (id, collection) { return __awaiter(void 0, void 0, void 0, function () {
    var answer, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, collection.deleteOne({ _id: new mongodb_1.ObjectId(id) })];
            case 1:
                answer = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                console.log(err_6 === null || err_6 === void 0 ? void 0 : err_6.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, answer];
        }
    });
}); };
exports.deleteOne = deleteOne;
var getLinkOfCollections = function (initial, linked) {
    var result = initial.map(function (initialItem) {
        for (var _i = 0, linked_1 = linked; _i < linked_1.length; _i++) {
            var linkedItem = linked_1[_i];
            if (String(initialItem._id) === String(linkedItem._id)) {
                initialItem.comments = linkedItem.info;
            }
        }
        return initialItem;
    });
    return result;
};
exports.getLinkOfCollections = getLinkOfCollections;
