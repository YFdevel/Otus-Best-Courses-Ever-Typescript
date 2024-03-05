var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as uuid from "uuid";
import * as path from "node:path";
const dirName = path.dirname(process.argv[1]);
export class FileService {
    static saveImageFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileExtension;
            try {
                const mimeType = file.mimetype;
                if (mimeType != null) {
                    fileExtension = mimeType.slice(mimeType.indexOf("/") + 1);
                    if (fileExtension.match(/(jpg|jpeg|png|gif)$/)) {
                        const fileName = uuid.v4() + `.${fileExtension}`;
                        const filePath = path.resolve(dirName, 'static/assets/', fileName);
                        yield file.mv(filePath);
                        return fileName;
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static saveVideoFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileExtension;
            try {
                const mimeType = file.mimetype;
                if (mimeType != null) {
                    fileExtension = mimeType.slice(mimeType.indexOf("/") + 1);
                    if (fileExtension.match(/(mp4|avi|mkv|mov)$/)) {
                        const fileName = uuid.v4() + `.${fileExtension}`;
                        const filePath = path.resolve(dirName, 'static/assets/', fileName);
                        yield file.mv(filePath);
                        return fileName;
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static saveTextFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileExtension;
            try {
                const mimeType = file.mimetype;
                if (mimeType != null) {
                    fileExtension = mimeType.slice(mimeType.indexOf("/") + 1);
                    if (fileExtension.match(/(doc|docx|txt|rtf|pdf)$/)) {
                        const fileName = uuid.v4() + `.${fileExtension}`;
                        const filePath = path.resolve(dirName, 'static/assets/', fileName);
                        yield file.mv(filePath);
                        return fileName;
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
