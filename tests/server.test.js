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
var supertest_1 = require("supertest");
var assert_1 = require("assert");
var fs_1 = require("fs");
var path_1 = require("path");
var common_es_1 = require("common-es");
var index_1 = require("../index");
var globals_1 = require("@jest/globals");
var jest_mock_axios_1 = require("jest-mock-axios");
var _a = (0, common_es_1.getGlobals)(import.meta.url), __dirname = _a.__dirname, __filename = _a.__filename;
var menu = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "/views/menu.mustache")).toString();
(0, globals_1.describe)('Index', function () {
    (0, globals_1.afterAll)(function () {
        index_1.server.close();
    });
    (0, globals_1.it)("Should get main page", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                        .get("/")
                        .expect('Content-Type', /text\/html/)
                        .expect(200)
                        .expect(function (_a) {
                        var body = _a.body;
                        return (0, globals_1.expect)(body).toMatchSnapshot();
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.it)("Should include menu", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                        .get("/")
                        .expect('Content-Type', /text\/html/)
                        .expect(200)
                        .expect(function (response) {
                        assert_1.default.deepEqual(response.body, menu);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.it)('Should include courses', function (done) {
        (0, supertest_1.default)(index_1.app)
            .get("/")
            .expect(200)
            .expect(function (response) {
            assert_1.default.deepEqual(response.body, { title: /string/, description: /string/ });
        })
            .end(done);
    });
});
(0, globals_1.describe)('Users', function () {
    (0, globals_1.afterAll)(function () {
        index_1.server.close();
    });
    (0, globals_1.it)("user create response", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, jest_mock_axios_1.default.post.mockImplementation(function (url) {
                        if (url === 'https://localhost:3001/users') {
                            return Promise.resolve({
                                data: {
                                    firstName: "Peter",
                                    lastName: "Jackson",
                                    email: "example@google.com",
                                    password: "1234567"
                                }
                            });
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.it)("get users response", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                        .get('/users')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .catch(function (err) {
                        (0, assert_1.default)(err === undefined);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.it)('get user by id', function (done) {
        (0, supertest_1.default)(index_1.app)
            .get('/users/65b9f2b794070d3f84197469')
            .expect(200)
            .expect(function (response) {
            assert_1.default.deepEqual(response.body, { firstName: "Иван", lastName: "Петров" });
        })
            .end(done);
    });
    (0, globals_1.it)('should return NotFound with status 404', function (done) {
        (0, supertest_1.default)(index_1.app)
            .get('/users/6566')
            .expect(404)
            .end(done);
    });
});
(0, globals_1.describe)('Courses', function () {
    (0, globals_1.afterAll)(function () {
        index_1.server.close();
    });
    (0, globals_1.it)("course create response", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, jest_mock_axios_1.default.post.mockImplementation(function (url) {
                        if (url === 'https://localhost:3001/courses') {
                            return Promise.resolve({
                                data: {
                                    title: "Course",
                                    description: "Course Description",
                                    duration: "16",
                                    price: "10"
                                }
                            });
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.it)("get courses response", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                        .get('/courses')
                        .expect('Content-Type', /text\/html/)
                        .expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.it)('get course by id', function (done) {
        (0, supertest_1.default)(index_1.app)
            .get('/courses/65b00c5e08e60f472b9f9404')
            .expect('Content-Type', /text\/plain/)
            .expect(function (response) {
            assert_1.default.deepEqual(response.body, { title: /string/, lastName: /string/ });
        })
            .end(done);
    });
    (0, globals_1.it)('should return NotFound with status 404', function (done) {
        (0, supertest_1.default)(index_1.app)
            .delete('/courses/6545')
            .expect(404)
            .end(done);
    });
});
(0, globals_1.describe)('Lessons', function () {
    (0, globals_1.afterAll)(function () {
        index_1.server.close();
    });
    (0, globals_1.it)("lesson create response", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, jest_mock_axios_1.default.post.mockImplementation(function (url) {
                        if (url === 'https://localhost:3001/lessons') {
                            return Promise.resolve({
                                data: {
                                    title: "Lesson",
                                    description: "Lesson Description"
                                }
                            });
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.it)("get lessons response", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                        .get('/lessons')
                        .expect('Content-Type', /json/)
                        .expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.it)('get lesson by id', function (done) {
        (0, supertest_1.default)(index_1.app)
            .get('/lessons/65b423e1a486c64fd5c6f655')
            .expect('Content-Type', /json/)
            .expect(function (response) {
            assert_1.default.deepEqual(response.body, { title: /string/, description: /string/ });
        })
            .end(done);
    });
    (0, globals_1.it)('should return NotFound with status 404', function (done) {
        (0, supertest_1.default)(index_1.app)
            .patch('/lessons/6545')
            .expect(404)
            .end(done);
    });
});
(0, globals_1.describe)('Comments', function () {
    (0, globals_1.afterAll)(function () {
        index_1.server.close();
    });
    (0, globals_1.it)("comment create response", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, jest_mock_axios_1.default.post.mockImplementation(function (url) {
                        if (url === 'https://localhost:3001/comments') {
                            return Promise.resolve({
                                data: {
                                    title: "Comment",
                                    message: "Message"
                                }
                            });
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.it)("get comments response", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                        .get('/comments')
                        .expect('Content-Type', /json/)
                        .expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.it)('get comment by id', function (done) {
        (0, supertest_1.default)(index_1.app)
            .get('/comments/65b3ba30eb0360a86c0ab7db')
            .expect('Content-Type', /json/)
            .expect(function (response) {
            assert_1.default.deepEqual(response.body, { title: /string/, message: /string/ });
        })
            .end(done);
    });
    (0, globals_1.it)('should return NotFound with status 404', function (done) {
        (0, supertest_1.default)(index_1.app)
            .patch('/comments/454534')
            .expect(404)
            .end(done);
    });
});
(0, globals_1.describe)('Reviews', function () {
    (0, globals_1.afterAll)(function () {
        index_1.server.close();
    });
    (0, globals_1.it)("get reviews response", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                        .get('/reviews')
                        .expect('Content-Type', /json/)
                        .expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.it)('should return NotFound with status 404', function (done) {
        (0, supertest_1.default)(index_1.app)
            .patch('/reviews/454534')
            .expect(404)
            .end(done);
    });
});
