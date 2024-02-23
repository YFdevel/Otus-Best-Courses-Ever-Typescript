import * as uuid from "uuid";
import path from 'path';
import {getGlobals} from "common-es";
import mime from "mime";
const { __dirname, __filename } = getGlobals(import.meta.url);

export class FileService {
    static  async  saveImageFile(file) {
        try{
            const mimeType=mime.getType(file.name);
            const fileExtension=mimeType.slice(mimeType.indexOf("/")+1);
            if (fileExtension.match(/(jpg|jpeg|png|gif)$/)) {
                const fileName = uuid.v4() + `.${fileExtension}`;
                const filePath = path.resolve(__dirname, '../static/assets/', fileName);
                await file.mv(filePath);
                return fileName;
            }
        }catch(err){
            console.log(err)
        }
    }
    static  async  saveVideoFile(file) {
        try{
            const mimeType=mime.getType(file.name);
            const fileExtension=mimeType.slice(mimeType.indexOf("/")+1);
            if (fileExtension.match(/(mp4|avi|mkv|mov)$/)) {
                const fileName = uuid.v4() + `.${fileExtension}`;
                const filePath = path.resolve(__dirname, '../static/assets/', fileName);
                await file.mv(filePath);
                return fileName;
            }
        }catch(err){
            console.log(err)
        }
    }
    static  async  saveTextFile(file) {
        try{
            const mimeType=mime.getType(file.name);
            const fileExtension=mimeType.slice(mimeType.indexOf("/")+1);
            if (fileExtension.match(/(doc|docx|txt|rtf|pdf)$/)) {
                const fileName = uuid.v4() + `.${fileExtension}`;
                const filePath = path.resolve(__dirname, '../static/assets/', fileName);
                await file.mv(filePath);
                return fileName;
            }
        }catch(err){
            console.log(err)
        }
    }
}

