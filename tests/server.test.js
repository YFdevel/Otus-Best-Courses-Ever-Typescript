import request from 'supertest';
import assert from 'assert';
import fs from "fs";
import path from "path";
import {getGlobals} from "common-es";
import {app, server} from '../index.js';
import {afterAll, describe, it, expect} from "@jest/globals";
import mockAxios from "jest-mock-axios";


const {__dirname, __filename} = getGlobals(import.meta.url);
const menu = fs.readFileSync(path.join(__dirname, "..", "/views/menu.mustache")).toString();

describe('Index', () => {

    afterAll(() => {
        server.close();
    });

    test("Should get main page", async () => {
        await request(app)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200)
            .expect(({body}) => expect(body).toMatchSnapshot());
    });

    test("Should include menu", async () => {
        await request(app)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200)
            .expect(function (response) {
                assert.deepEqual(response.body, menu);
            })
    });

    test('Should include courses', function (done) {
        request(app)
            .get('/')
            .expect(200)
            .expect(function (response) {
                assert.deepEqual(response.body, {title:/string/, description: /string/});
            })
            .end(done)
    });

});
describe('Users', () => {

    afterAll(() => {
        server.close();
    });
    test("user create response", async () => {
        await mockAxios.post.mockImplementation((url) => {
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
        });
    });
    test("get users response", async () => {
        await request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .catch((err) => {
                assert(err === undefined);
            });
    });


    test('get user by id', function (done) {
        request(app)
            .get('/users/65b9f2b794070d3f84197469')
            .expect(200)
            .expect(function (response) {
                assert.deepEqual(response.body, {firstName: "Иван", lastName: "Петров"});
            })
            .end(done)
    });

    test('should return NotFound with status 404', function (done) {
        request(app)
            .get('/users/6566')
            .expect(404)
            .end(done)
    });

});
describe('Courses', () => {

    afterAll(() => {
        server.close();
    });
    test("course create response", async () => {
        await mockAxios.post.mockImplementation((url) => {
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
        });
    });
    test("get courses response", async () => {
        await request(app)
            .get('/courses')
            .expect('Content-Type', /text\/html/)
            .expect(200)
    });


    test('get course by id', function (done) {
        request(app)
            .get('/courses/65b00c5e08e60f472b9f9404')
            .expect('Content-Type', /text\/plain/)
            .expect(function (response) {
                assert.deepEqual(response.body, {title: /string/, lastName: /string/});
            })
            .end(done)
    });

    test('should return NotFound with status 404', function (done) {
        request(app)
            .delete('/courses/6545')
            .expect(404)
            .end(done)
    });

});
describe('Lessons', () => {

    afterAll(() => {
        server.close();
    });
    test("lesson create response", async () => {
        await mockAxios.post.mockImplementation((url) => {
            if (url === 'https://localhost:3001/lessons') {
                return Promise.resolve({
                    data: {
                        title: "Lesson",
                        description: "Lesson Description"
                    }
                });
            }
        });
    });
    test("get lessons response", async () => {
        await request(app)
            .get('/lessons')
            .expect('Content-Type', /json/)
            .expect(200)
    });


    test('get lesson by id', function (done) {
        request(app)
            .get('/lessons/65b423e1a486c64fd5c6f655')
            .expect('Content-Type', /json/)
            .expect(function (response) {
                assert.deepEqual(response.body, {title: /string/, description: /string/});
            })
            .end(done)
    });

    test('should return NotFound with status 404', function (done) {
        request(app)
            .patch('/lessons/6545')
            .expect(404)
            .end(done)
    });

});
describe('Comments', () => {

    afterAll(() => {
        server.close();
    });
    test("comment create response", async () => {
        await mockAxios.post.mockImplementation((url) => {
            if (url === 'https://localhost:3001/comments') {
                return Promise.resolve({
                    data: {
                        title: "Comment",
                        message: "Message"
                    }
                });
            }
        });
    });
    test("get comments response", async () => {
        await request(app)
            .get('/comments')
            .expect('Content-Type', /json/)
            .expect(200)
    });


    test('get comment by id', function (done) {
        request(app)
            .get('/comments/65b3ba30eb0360a86c0ab7db')
            .expect('Content-Type', /json/)
            .expect(function (response) {
                assert.deepEqual(response.body, {title: /string/, message: /string/});
            })
            .end(done)
    });

    test('should return NotFound with status 404', function (done) {
        request(app)
            .patch('/comments/454534')
            .expect(404)
            .end(done)
    });

});
describe('Reviews', () => {

    afterAll(() => {
        server.close();
    });
    test("get reviews response", async () => {
        await request(app)
            .get('/reviews')
            .expect('Content-Type', /json/)
            .expect(200)
    });

    test('should return NotFound with status 404', function (done) {
        request(app)
            .patch('/reviews/454534')
            .expect(404)
            .end(done)
    });

});
