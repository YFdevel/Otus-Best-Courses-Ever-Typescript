"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const uuid = __importStar(require("uuid"));
const path_1 = __importDefault(require("path"));
// import {getGlobals} from "common-es";
const mime_1 = __importDefault(require("mime"));
// const { __dirname, __filename } = getGlobals(import.meta.url);
const dirname = process.cwd();
class FileService {
    static async saveImageFile(file) {
        let fileExtension;
        try {
            const mimeType = mime_1.default.getType(file.name);
            if (mimeType != null) {
                fileExtension = mimeType.slice(mimeType.indexOf("/") + 1);
                if (fileExtension.match(/(jpg|jpeg|png|gif)$/)) {
                    const fileName = uuid.v4() + `.${fileExtension}`;
                    const filePath = path_1.default.resolve(dirname, '../static/assets/', fileName);
                    await file.mv(filePath);
                    return fileName;
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    static async saveVideoFile(file) {
        let fileExtension;
        try {
            const mimeType = mime_1.default.getType(file.name);
            if (mimeType != null) {
                fileExtension = mimeType.slice(mimeType.indexOf("/") + 1);
                if (fileExtension.match(/(mp4|avi|mkv|mov)$/)) {
                    const fileName = uuid.v4() + `.${fileExtension}`;
                    const filePath = path_1.default.resolve(__dirname, '../static/assets/', fileName);
                    await file.mv(filePath);
                    return fileName;
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    static async saveTextFile(file) {
        let fileExtension;
        try {
            const mimeType = mime_1.default.getType(file.name);
            if (mimeType != null) {
                fileExtension = mimeType.slice(mimeType.indexOf("/") + 1);
                if (fileExtension.match(/(doc|docx|txt|rtf|pdf)$/)) {
                    const fileName = uuid.v4() + `.${fileExtension}`;
                    const filePath = path_1.default.resolve(__dirname, '../static/assets/', fileName);
                    await file.mv(filePath);
                    return fileName;
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.FileService = FileService;
