"use strict";
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
exports.server = exports.app = void 0;
var express_1 = require("express");
var https_1 = require("https");
var fs_1 = require("fs");
var mustache_express_1 = require("mustache-express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var express_fileupload_1 = require("express-fileupload");
var common_es_1 = require("common-es");
var cookie_parser_1 = require("cookie-parser");
var swagger_ui_express_1 = require("swagger-ui-express");
var openapi_1 = require("./swagger/openapi");
var courses_controller_1 = require("./controllers/courses.controller");
var lessons_controller_1 = require("./controllers/lessons.controller");
var users_controller_1 = require("./controllers/users.controller");
var comments_controller_1 = require("./controllers/comments.controller");
var reviews_controller_1 = require("./controllers/reviews.controller");
var database_service_1 = require("./services/database.service");
dotenv_1.default.config();
var _a = (0, common_es_1.getGlobals)(import.meta.url), __dirname = _a.__dirname, __filename = _a.__filename;
var key = fs_1.default.readFileSync('ssl/key.pem');
var cert = fs_1.default.readFileSync('ssl/cert.pem');
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({ credentials: true, origin: process.env.CLIENT_URL }));
exports.app.use(express_1.default.static('static'));
exports.app.set('views', "".concat(__dirname, "/views"));
exports.app.set('view engine', 'mustache');
exports.app.engine('mustache', (0, mustache_express_1.default)());
exports.app.use((0, express_fileupload_1.default)({}));
exports.app.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapi_1.swaggerDocument));
exports.app.use("/courses", courses_controller_1.default);
exports.app.use("/users", users_controller_1.default);
exports.app.use("/lessons", lessons_controller_1.default);
exports.app.use("/comments", comments_controller_1.default);
exports.app.use("/reviews", reviews_controller_1.default);
exports.app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_service_1.coursesCollection.find().toArray()];
            case 1:
                courses = _a.sent();
                res.render('index', {
                    list: courses
                });
                return [2 /*return*/];
        }
    });
}); });
exports.app.use(function (err, req, res, next) {
    console.log("Возникла ошибка в работе приложения: ", err === null || err === void 0 ? void 0 : err.message);
    console.log(err.stack);
    res.status(500).send({ message: "Uh oh! An unexpected error occured." });
});
exports.server = https_1.default.createServer({ key: key, cert: cert }, exports.app);
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, database_service_1.connectDatabase)()];
            case 1:
                _a.sent();
                exports.server.listen(process.env.SERVER_PORT, function () { console.log("Server is listening on ".concat(process.env.SERVER_PORT)); });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log("Возникла ошибка в работе приложения: ", err_1 === null || err_1 === void 0 ? void 0 : err_1.message);
                console.log(err_1.stack);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
start().catch();
