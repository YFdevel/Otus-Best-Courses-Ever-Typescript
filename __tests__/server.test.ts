import {agent as _request} from "supertest";
import assert from 'assert';
import * as serverInstance from '../index';
import {afterAll, describe, test, expect} from "@jest/globals";


describe('Server', () => {
    afterAll(async () => {
        await serverInstance.server.close();
    });
    const userPayload = {
        email: "ivan_petrov@mail.ru",
        password: "ivan_petrov_12345",
    };


    test("Should get main page api from server", async () => {
        await _request(serverInstance.app).get("/api")
            .expect('Content-Type', /text\/html/)
            .expect(301)
            .expect(({body}) => expect(body).toMatchSnapshot());
    });

    test("Should get all users (USERS)", async () => {
        await _request(serverInstance.app)
            .get("/users")
            .expect('Content-Type', /application\/json/)
            .expect(200)
    });

    test('get user by id (USERS)', async () => {
        await _request(serverInstance.app)
            .get('/users/65b9f2b794070d3f84197469')
            .expect(200)
            .expect(function (response) {
                assert.deepEqual(response.body, {firstName: "Иван", lastName: "Петров"});
            })
    });

    test('should return NotFound with status 404 (USERS)', async () => {
        await _request(serverInstance.app)
            .get('/users/6566')
            .expect(404)
    });

    test('should authorize with success (USERS)', async () => {
        await _request(serverInstance.app)
            .post('/users/login')
            .send(userPayload)
            .set('Content-Type', 'application/json')
            .expect(201)
    });

    test('should fail unauthorized (USERS)', async () => {
        await _request(serverInstance.app)
            .post('/users/login')
            .send({
                email:"example@mail.ru",
                password:"1234523"
            })
            .set('Content-Type', 'application/json')
            .expect(400)
    });

    test("Should get all reviews (REVIEWS)", async () => {
        await _request(serverInstance.app)
            .get("/reviews")
            .expect('Content-Type', /application\/json/)
            .expect(200)
    });

    test('should return NotFound with status 404 (REVIEWS)', async () => {
        await _request(serverInstance.app)
            .patch('/reviews/454534')
            .expect(404)
    });

    test('get course by id (COURSES)', async () => {
        await _request(serverInstance.app)
            .get('/courses/65b00c5e08e60f472b9f9404')
            .expect(302)
    });

    test('should return NotFound with status 404 (COURSES)', async () => {
        await _request(serverInstance.app)
            .get('/courses/656678')
            .expect(302)
    });


    test("get all comments (COMMENTS)", async () => {
        await _request(serverInstance.app)
            .get('/comments')
            .expect('Content-Type', /json/)
            .expect(200)
    });


    test('get comment by id (COMMENTS)', async () => {
        await _request(serverInstance.app)
            .get('/comments/65b3ba30eb0360a86c0ab7db')
            .expect('Content-Type', /json/)
            .expect(function (response) {
                assert.deepEqual(response.body, {title: /string/, message: /string/});
            })
    });

    test('should return NotFound with status 404 (COMMENTS)', async () => {
        await _request(serverInstance.app)
            .patch('/comments/454534')
            .expect(404)
    });

    test("get lessons response", async () => {
        await _request(serverInstance.app)
            .get('/lessons')
            .expect('Content-Type', /json/)
            .expect(200)
    });


    test('get lesson by id', async () => {
        await _request(serverInstance.app)
            .get('/lessons/65b423e1a486c64fd5c6f655')
            .expect('Content-Type', /json/)
            .expect(function (response) {
                assert.deepEqual(response.body, {title: /string/, description: /string/});
            })
    });

    test('should return NotFound with status 404', async () => {
        await _request(serverInstance.app)
            .patch('/lessons/6545')
            .expect(404)
    });

});