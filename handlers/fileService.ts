import * as uuid from "uuid";
import * as path from "node:path";
import {UploadedFile} from "express-fileupload";

const dirName=path.dirname(process.argv[1]);

export class FileService {
    static  async  saveImageFile(file:UploadedFile):Promise<string|undefined> {
        let fileExtension;
        try{
            const mimeType=file.mimetype;
            if (mimeType != null) {
               fileExtension = mimeType.slice(mimeType.indexOf("/") + 1);
                if (fileExtension.match(/(jpg|jpeg|png|gif)$/)) {
                    const fileName = uuid.v4() + `.${fileExtension}`;
                    const filePath = path.resolve(dirName, 'static/assets/', fileName);
                    await file.mv(filePath);
                    return fileName;
                }
            }
        }catch(err){
            console.log(err)
        }
    }
    static  async saveVideoFile(file: UploadedFile):Promise<string | undefined> {
        let fileExtension;
        try{
            const mimeType=file.mimetype;
            if (mimeType != null) {
               fileExtension = mimeType.slice(mimeType.indexOf("/") + 1);
                if (fileExtension.match(/(mp4|avi|mkv|mov)$/)) {
                    const fileName = uuid.v4() + `.${fileExtension}`;
                    const filePath = path.resolve(dirName, 'static/assets/', fileName);
                    await file.mv(filePath);
                    return fileName;
                }
            }
        }catch(err){
            console.log(err)
        }
    }
    static  async  saveTextFile(file:UploadedFile):Promise<string|undefined> {
        let fileExtension;
        try{
            const mimeType=file.mimetype;
            if (mimeType != null) {
                fileExtension = mimeType.slice(mimeType.indexOf("/") + 1);
                if (fileExtension.match(/(doc|docx|txt|rtf|pdf)$/)) {
                    const fileName = uuid.v4() + `.${fileExtension}`;
                    const filePath = path.resolve(dirName, 'static/assets/', fileName);
                    await file.mv(filePath);
                    return fileName;
                }
            }
        }catch(err){
            console.log(err)
        }
    }
}

