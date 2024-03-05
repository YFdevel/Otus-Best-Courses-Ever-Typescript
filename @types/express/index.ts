import {JwtPayload} from "jsonwebtoken";
import {FileArray} from "express-fileupload";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
            files?: FileArray|null|undefined
        }
    }
}