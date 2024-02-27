import express from "express";
import https from "https";
import fs from "fs";
import mustacheExpress from "mustache-express";
import cors from "cors";
import * as dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { getGlobals } from "common-es";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger/openapi";
import coursesRouter from "./controllers/courses.controller";
import lessonsRouter from "./controllers/lessons.controller";
import usersRouter from "./controllers/users.controller";
import commentsRouter from "./controllers/comments.controller";
import reviewsRouter from "./controllers/reviews.controller";
import { coursesCollection, connectDatabase } from "./services/database.service";
dotenv.config();
const { __dirname, __filename } = getGlobals(import.meta.url);
const key = fs.readFileSync('ssl/key.pem');
const cert = fs.readFileSync('ssl/cert.pem');
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.static(`${__dirname}/static`));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
app.use(fileUpload({}));
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/courses", coursesRouter);
app.use("/users", usersRouter);
app.use("/lessons", lessonsRouter);
app.use("/comments", commentsRouter);
app.use("/reviews", reviewsRouter);
app.get('/', async (req, res) => {
    const courses = await coursesCollection.find().toArray();
    res.render('index', {
        list: courses
    });
});
const errorHandler = (err, req, res, next) => {
    console.log("Возникла ошибка в работе приложения: ", err?.message);
    console.log(err.stack);
    res.status(500).send({ message: "Uh oh! An unexpected error occured." });
};
app.use(errorHandler);
export const server = https.createServer({ key: key, cert: cert }, app);
const start = async () => {
    try {
        await connectDatabase();
        server.listen(process.env.SERVER_PORT
        // () => { console.log(`Server is listening on ${process.env.SERVER_PORT}`) }
        );
    }
    catch (err) {
        console.log("Возникла ошибка в работе приложения: ", err?.message);
        console.log(err?.stack);
    }
};
start().catch();
