// import supertest from "supertest";
//import * as UserService from "../services/users.service";
 import {describe, test, expect } from "@jest/globals"
// import {start} from "../index";
//import axios from "axios";
//
// start().catch();
//
// jest.mock('axios', () => {
//     return {
//         baseURL: 'https://localhost:3001/users',
//         request: jest.fn().mockResolvedValue({
//             data: [
//                 {
//                     _id: 'gjhghjg35',
//                     firstName: 'Иван',
//                     lastName: 'Петров',
//                     age: '45'
//                 }
//             ]
//         }),
//     }
// });
// describe('test getUsers', () => {
//     afterEach(() => jest.resetAllMocks());
//
//     it('fetches users', async () => {
//         const users = await axios.request;
//         expect(axios.request).toHaveBeenCalled();
//         expect(axios.request).toHaveBeenCalledWith({ method: 'get', });
//         // expect(users.length).toEqual(1);
//         // expect(users[0]._id).toEqual('gjhghjg35')
//     });
// });
// const userId = new mongoose.Types.ObjectId().toString();
//
// const userPayload = {
//     _id: userId,
//     email: "jane.doe@example.com",
//     name: "Jane Doe",
// };
//
// const userInput = {
//     email: "test@example.com",
//     name: "Jane Doe",
//     password: "Password123",
//     passwordConfirmation: "Password123",
// };
//
// const sessionPayload = {
//     _id: new mongoose.Types.ObjectId().toString(),
//     user: userId,
//     valid: true,
//     userAgent: "PostmanRuntime/7.28.4",
//     createdAt: new Date("2021-09-30T13:31:07.674Z"),
//     updatedAt: new Date("2021-09-30T13:31:07.674Z"),
//     __v: 0,
// };

//
// describe('sum of 2 numbers', () => {
//     test(' 2 + 2 equal 4', () => {
//         expect(2 + 2).toEqual(4)
//     });
// });

// describe("user", () => {
//     // user registration
//
//     describe("user registration", () => {
//         describe("given the username and password are valid", () => {
//             it("should return the user payload", async () => {
//                 const createUserServiceMock = jest
//                     .spyOn(UserService, "createUser")
//                     // @ts-ignore
//                     .mockReturnValueOnce(userPayload);
//
//                 const { statusCode, body } = await supertest(app)
//                     .post("/api/users")
//                     .send(userInput);
//
//                 expect(statusCode).toBe(200);
//
//                 expect(body).toEqual(userPayload);
//
//                 expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
//             });
//         });
//
//         describe("given the passwords do not match", () => {
//             it("should return a 400", async () => {
//                 const createUserServiceMock = jest
//                     .spyOn(UserService, "createUser")
//                     // @ts-ignore
//                     .mockReturnValueOnce(userPayload);
//
//                 const { statusCode } = await supertest(app)
//                     .post("/api/users")
//                     .send({ ...userInput, passwordConfirmation: "doesnotmatch" });
//
//                 expect(statusCode).toBe(400);
//
//                 expect(createUserServiceMock).not.toHaveBeenCalled();
//             });
//         });
//
//         describe("given the user service throws", () => {
//             it("should return a 409 error", async () => {
//                 const createUserServiceMock = jest
//                     .spyOn(UserService, "createUser")
//                     .mockRejectedValueOnce("Oh no! :(");
//
//                 const { statusCode } = await supertest(createServer())
//                     .post("/api/users")
//                     .send(userInput);
//
//                 expect(statusCode).toBe(409);
//
//                 expect(createUserServiceMock).toHaveBeenCalled();
//             });
//         });
//     });
//
//     describe("create user session", () => {
//         describe("given the username and password are valid", () => {
//             it("should return a signed accessToken & refresh token", async () => {
//                 jest
//                     .spyOn(UserService, "validatePassword")
//                     // @ts-ignore
//                     .mockReturnValue(userPayload);
//
//                 jest
//                     .spyOn(SessionService, "createSession")
//                     // @ts-ignore
//                     .mockReturnValue(sessionPayload);
//
//                 const req = {
//                     get: () => {
//                         return "a user agent";
//                     },
//                     body: {
//                         email: "test@example.com",
//                         password: "Password123",
//                     },
//                 };
//
//                 const send = jest.fn();
//
//                 const res = {
//                     send,
//                 };
//
//                 // @ts-ignore
//                 await createUserSessionHandler(req, res);
//
//                 expect(send).toHaveBeenCalledWith({
//                     accessToken: expect.any(String),
//                     refreshToken: expect.any(String),
//                 });
//             });
//         });
//     });
// });


// import { equal } from "assert";

// describe("Typescript usage suite", () => {
//     it("should be able to execute a test", () => {
//         equal(2+2, 4);
//     });
// });


describe('sum of 2 numbers', () => {
    test(' 2 + 2 equal 4', () => {
        expect(2 + 2).toEqual(4)
    });
});
