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
exports.start = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const mustache_express_1 = __importDefault(require("mustache-express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const openapi_1 = require("./swagger/openapi");
const courses_controller_1 = __importDefault(require("./controllers/courses.controller"));
const lessons_controller_1 = __importDefault(require("./controllers/lessons.controller"));
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const comments_controller_1 = __importDefault(require("./controllers/comments.controller"));
const reviews_controller_1 = __importDefault(require("./controllers/reviews.controller"));
const database_service_1 = require("./services/database.service");
dotenv.config();
// const { __dirname, __filename } = getGlobals(import.meta.url);
const dirname = process.cwd();
const key = fs_1.default.readFileSync('ssl/key.pem');
const cert = fs_1.default.readFileSync('ssl/cert.pem');
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({ credentials: true, origin: process.env.CLIENT_URL }));
exports.app.use(express_1.default.static(`${dirname}/static`));
exports.app.set('views', `${dirname}/views`);
exports.app.set('view engine', 'mustache');
exports.app.engine('mustache', (0, mustache_express_1.default)());
exports.app.use((0, express_fileupload_1.default)({}));
exports.app.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapi_1.swaggerDocument));
exports.app.use("/courses", courses_controller_1.default);
exports.app.use("/users", users_controller_1.default);
exports.app.use("/lessons", lessons_controller_1.default);
exports.app.use("/comments", comments_controller_1.default);
exports.app.use("/reviews", reviews_controller_1.default);
exports.app.get('/', async (req, res) => {
    const courses = await database_service_1.coursesCollection.find().toArray();
    res.render('index', {
        list: courses
    });
});
const errorHandler = (err, req, res, next) => {
    console.log("Возникла ошибка в работе приложения: ", err === null || err === void 0 ? void 0 : err.message);
    console.log(err.stack);
    res.status(500).send({ message: "Uh oh! An unexpected error occured." });
};
exports.app.use(errorHandler);
exports.server = https_1.default.createServer({ key: key, cert: cert }, exports.app);
const start = async () => {
    try {
        await (0, database_service_1.connectDatabase)();
        exports.server.listen(process.env.SERVER_PORT
        // () => { console.log(`Server is listening on ${process.env.SERVER_PORT}`) }
        );
    }
    catch (err) {
        console.log("Возникла ошибка в работе приложения: ", err === null || err === void 0 ? void 0 : err.message);
        console.log(err === null || err === void 0 ? void 0 : err.stack);
    }
};
exports.start = start;
(0, exports.start)().catch();
