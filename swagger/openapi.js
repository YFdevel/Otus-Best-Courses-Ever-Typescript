export const swaggerDocument = {
    "openapi": "3.0.1",
    "info": {
        "title": "Best Courses Ever Express",
        "description": "Простое CRUD API на основе Express JS with Cookie Authentication",
        "version": "0.1.0"
    },
    "servers": [
        {
            "url": "https://localhost:3001"
        }
    ],
    "tags": [
        {
            "name": "users",
            "description": "Пользователи сайта"
        },
        {
            "name": "courses",
            "description": "Курсы"
        },
        {
            "name": "lessons",
            "description": "Уроки к определенному курсу"
        },
        {
            "name": "comments",
            "description": "Комментарии к уроку"
        },
        {
            "name": "reviews",
            "description": "Отзывы к курсу"
        },
    ],
    "components": {
        "schemas": {
            "User": {
                "type": "object",
                "properties": {
                    "firstName": {
                        "type": "string"
                    },
                    "lastName": {
                        "type": "string"
                    },
                    "age": {
                        "type": "number"
                    },
                    "avatar": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "password": {
                        "type": "string"
                    },
                    "isBanned": {
                        "type": "boolean"
                    },
                    "registerAt": {
                        "type": "date"
                    },
                    "roles": {
                        "type": "string[]"
                    },
                    "courses": {
                        "type": "string[]"
                    },
                    "lessons": {
                        "type": "string[]"
                    },
                    "comments": {
                        "type": "string[]"
                    },
                    "reviews": {
                        "type": "string[]"
                    }
                }
            },
            "Course": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    },
                    "authorId": {
                        "type": "string"
                    },
                    "authorFirstName": {
                        "type": "string"
                    },
                    "authorLastName": {
                        "type": "string"
                    },
                    "duration": {
                        "type": "number"
                    },
                    "price": {
                        "type": "number"
                    },
                    "startedAt": {
                        "type": "date"
                    },
                    "updatedAt": {
                        "type": "date"
                    },
                    "lessons": {
                        "type": "string[]"
                    },
                    "reviews": {
                        "type": "string[]"
                    }
                }
            },
            "Lesson": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    },
                    "authorId": {
                        "type": "string"
                    },
                    "courseId": {
                        "type": "string"
                    },
                    "videoUrl": {
                        "type": "string"
                    },
                    "pdfUrl": {
                        "type": "string"
                    },
                    "startedAt": {
                        "type": "date"
                    },
                    "updatedAt": {
                        "type": "date"
                    },
                    "comments": {
                        "type": "string[]"
                    }
                }
            },
            "Comment": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string"
                    },
                    "message": {
                        "type": "string"
                    },
                    "authorId": {
                        "type": "string"
                    },
                    "lessonId": {
                        "type": "string"
                    },
                    "courseId": {
                        "type": "string"
                    },
                    "authorFirstName": {
                        "type": "string"
                    },
                    "authorLastName": {
                        "type": "string"
                    },
                    "startedAt": {
                        "type": "date"
                    }
                }
            },
            "Review": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string"
                    },
                    "message": {
                        "type": "string"
                    },
                    "authorId": {
                        "type": "string"
                    },
                    "courseId": {
                        "type": "string"
                    },
                    "startedAt": {
                        "type": "date"
                    }
                }
            },
        },
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT",
                "name": "authorization",
            },
            "cookieAuth": {
                "type": "apiKey",
                "in": "cookie",
                "name": "accessToken",
            },
        },
    },
    "paths": {
        "/users": {
            "get": {
                "summary": "returns all users",
                "tags": [
                    "users"
                ],
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "summary": "create user",
                "tags": [
                    "users"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/User"
                            },
                            "example": {
                                "firstName": "Peter",
                                "lastName": "Jackson",
                                "email": "example@google.com",
                                "password": "12345"
                            }
                        }
                    }
                },
                "parameters": [],
                "responses": {
                    "201": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Пользователь с таким email уже зарегистрирован"
                    },
                }
            },
        },
        "/users/login": {
            "post": {
                "summary": "returns JWT-token",
                "tags": [
                    "users"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "email": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    }
                                }
                            },
                            "example": {
                                "email": "example@google.com",
                                "password": "12345"
                            }
                        }
                    }
                },
                "parameters": [],
                "responses": {
                    "201": {
                        "description": "OK",
                        "headers": {
                            "Set-Cookie": {
                                "description": "Set cookie accessToken",
                                "schema": {
                                    "type": "string",
                                    "example": "xxxx.xxxxx.xxxx"
                                }
                            },

                        },
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "accessToken": {
                                            "type": "string",
                                        },
                                        "refreshToken": {
                                            "type": "string",
                                        },
                                        "accessTokenExpiration": {
                                            "type": "integer",
                                        },
                                    }

                                },
                                "example": {
                                    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjlmMmI3OTQwNzBkM2Y4NDE5NzQ2OSIsImlhdCI6MTcwODI0OTY0MiwiZXhwIjoxNzA4MjQ5NzAyfQ.IJcLpaOsYdyg8-4kpMVoq022ckwggWUweWRxLXcn0P8",
                                    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjlmMmI3OTQwNzBkM2Y4NDE5NzQ2OSIsImlhdCI6MTcwODI0OTY0MiwiZXhwIjoxNzA4ODU0NDQyfQ.EIHLC2srA4VOWlNLbBVUwgmNnCxJrhAWKc9L9yo3F14",
                                    "accessTokenExpiration": "60000",
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Не верный логин или пароль"
                    },
                }
            }
        },
        "/users/logout": {
            "get": {
                "summary": "log out user from account",
                "tags": [
                    "users"
                ],
                "parameters": [
                    {
                        "name": "accessToken",
                        "in": "cookie",
                        "description": "an authorization cookie (only for documentation here)",
                        "schema": {
                            "type": "string",
                            "example": "xxx.xxx.xxx"
                        }
                    }
                ],
                "description": "parameter accessToken just for test",
                "security": {
                    "cookieAuth": []
                },
                "responses": {
                    "200": {
                        "description": "OK",
                    }
                },
            },
        },
        "/users/profile": {
            "get": {
                "summary": "returns simple answer from get",
                "tags": [
                    "users"
                ],
                "parameters": [
                    {
                        "name": "accessToken",
                        "in": "cookie",
                        "description": "an authorization cookie (only for documentation here)",
                        "schema": {
                            "type": "string",
                            "example": "xxx.xxx.xxx"
                        }
                    }
                ],
                "description": "parameter accessToken just for test",
                "security": {
                    "cookieAuth": []
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "document": {
                                "schema": {
                                    "type": "text/html",
                                    "example": "<!doctype html><html><head></head><body>HTML</body></html>"
                                }
                            }
                        }
                    }
                }
            },
        },
        "/users/{id}": {
            "patch": {
                "summary": "update user",
                "tags": [
                    "users"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "age": {
                                        "type": "integer"
                                    },
                                    "password": {
                                        "type": "string"
                                    }
                                }
                            },
                            "example": {
                                "age": "34",
                                "password": "234567"
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "201": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
            "delete": {
                "summary": "delete user by id",
                "tags": [
                    "users"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
            "get": {
                "summary": "returns simple user",
                "tags": [
                    "users"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                },
                            }
                        }
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
        },
        "/users/avatar/{id}": {
            "patch": {
                "summary": "update user avatar",
                "tags": [
                    "users"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "avatar": {
                                        "type": "media"
                                    },
                                }
                            },
                            "example": {
                                "avatar": "xxxxx.jpg"
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "201": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                }
            },
        },
        "/courses": {
            "get": {
                "summary": "returns all courses",
                "tags": [
                    "courses"
                ],
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "document": {
                                "schema": {
                                    "type": "text/html",
                                    "example": "<!doctype html><html><head></head><body>HTML</body></html>"
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "summary": "create course",
                "tags": [
                    "courses"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Course"
                            },
                            "example": {
                                "title": "Course 1",
                                "description": "The best course",
                                "duration": 16,
                                "price": 10
                            }
                        }
                    }
                },
                "parameters": [],
                "responses": {
                    "201": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Курс с таким названием уже зарегистрирован"
                    },
                }
            },
        },
        "/courses/{id}": {
            "patch": {
                "summary": "update course",
                "tags": [
                    "courses"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "type": "string"
                                    },
                                    "description": {
                                        "type": "string"
                                    }
                                }
                            },
                            "example": {
                                "title": "New Course",
                                "description": "New description"
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "201": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
            "delete": {
                "summary": "delete course by id",
                "tags": [
                    "courses"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
            "get": {
                "summary": "returns simple course",
                "tags": [
                    "courses"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter just for test",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    },
                    {
                        "name": "accessToken",
                        "in": "cookie",
                        "description": "an authorization cookie (only for documentation here)",
                        "schema": {
                            "type": "string",
                            "example": "xxx.xxx.xxx"
                        }
                    }
                ],
                "security": {
                    "cookieAuth": []
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Course"
                                },
                            }
                        }
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
        },
        "/courses/author/{id}": {
            "get": {
                "summary": "get courses by author",
                "tags": [
                    "courses"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Course"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        "/lessons": {
            "get": {
                "summary": "returns all lessons",
                "tags": [
                    "lessons"
                ],
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Lesson"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "summary": "create lesson",
                "tags": [
                    "lessons"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Lesson"
                            },
                            "example": {
                                "title": "Lesson 1",
                                "description": "The best lesson",
                                "authorId": 11235,
                                "courseId": 108785
                            }
                        }
                    }
                },
                "parameters": [],
                "responses": {
                    "201": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Урок с таким названием уже зарегистрирован"
                    },
                }
            },
        },
        "/lessons/{id}": {
            "patch": {
                "summary": "update lesson",
                "tags": [
                    "lessons"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "type": "string"
                                    },
                                    "description": {
                                        "type": "string"
                                    }
                                }
                            },
                            "example": {
                                "title": "New Lesson",
                                "description": "New lesson description"
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "201": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
            "delete": {
                "summary": "delete lesson by id",
                "tags": [
                    "lessons"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
            "get": {
                "summary": "returns simple lesson",
                "tags": [
                    "lessons"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Lesson"
                                },
                            }
                        }
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
        },
        "/lessons/course/{id}": {
            "get": {
                "summary": "get lessons by course",
                "tags": [
                    "lessons"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter just for test",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    },
                    {
                        "name": "accessToken",
                        "in": "cookie",
                        "description": "an authorization cookie (only for documentation here)",
                        "schema": {
                            "type": "string",
                            "example": "xxx.xxx.xxx"
                        }
                    }
                ],
                "security": {
                    "cookieAuth": []
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "document": {
                                "schema": {
                                    "type": "text/html",
                                    "example": "<!doctype html><html><head></head><body>HTML</body></html>"
                                }
                            }
                        }
                    }
                }
            },
        },
        "/lessons/create/{id}": {
            "get": {
                "summary": "get page for create a lesson",
                "tags": [
                    "lessons"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter just for test",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "document": {
                                "schema": {
                                    "type": "text/html",
                                    "example": "<!doctype html><html><head></head><body>HTML</body></html>"
                                }
                            }
                        }
                    }
                }
            },
        },
        "/lessons/author/{id}": {
            "get": {
                "summary": "get all lessons by author",
                "tags": [
                    "lessons"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter just for test",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Lesson"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        "/comments": {
            "get": {
                "summary": "returns all comments",
                "tags": [
                    "comments"
                ],
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Comment"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "summary": "create comment",
                "tags": [
                    "comments"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Comment"
                            },
                            "example": {
                                "title": "Comment 1",
                                "message": "The best comment",
                                "authorId": 11235,
                                "lessonId": 108785,
                                "courseId": 105673785,
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "accessToken",
                        "in": "cookie",
                        "description": "an authorization cookie (only for documentation here)",
                        "schema": {
                            "type": "string",
                            "example": "xxx.xxx.xxx"
                        }
                    }
                ],
                "security": {
                    "cookieAuth": []
                },
                "responses": {
                    "201": {
                        "description": "OK"
                    },
                }
            },
        },
        "/comments/{id}": {
            "patch": {
                "summary": "update comment",
                "tags": [
                    "comments"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "type": "string"
                                    },
                                    "message": {
                                        "type": "string"
                                    }
                                }
                            },
                            "example": {
                                "title": "New Lesson",
                                "description": "New lesson description"
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "201": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
            "delete": {
                "summary": "delete comment by id",
                "tags": [
                    "comments"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
            "get": {
                "summary": "returns simple comment",
                "tags": [
                    "comments"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Comment"
                                },
                            }
                        }
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
        },
        "/comments/lesson/{id}": {
            "get": {
                "summary": "get comments by lesson",
                "tags": [
                    "comments"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter just for test",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Comment"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        "/comments/author/{id}": {
            "get": {
                "summary": "get all comments by author",
                "tags": [
                    "comments"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter just for test",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Comment"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        "/reviews": {
            "get": {
                "summary": "returns all reviews",
                "tags": [
                    "reviews"
                ],
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Review"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "summary": "create review",
                "tags": [
                    "reviews"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Review"
                            },
                            "example": {
                                "title": "Review 1",
                                "message": "The best review",
                                "authorId": 11235,
                                "courseId": 105673785,
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "accessToken",
                        "in": "cookie",
                        "description": "an authorization cookie (only for documentation here)",
                        "schema": {
                            "type": "string",
                            "example": "xxx.xxx.xxx"
                        }
                    }
                ],
                "security": {
                    "cookieAuth": []
                },
                "responses": {
                    "201": {
                        "description": "OK"
                    },
                }
            },
        },
        "/reviews/{id}": {
            "patch": {
                "summary": "update review",
                "tags": [
                    "reviews"
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "type": "string"
                                    },
                                    "message": {
                                        "type": "string"
                                    }
                                }
                            },
                            "example": {
                                "title": "New review",
                                "message": "New review message"
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "201": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
            "delete": {
                "summary": "delete review by id",
                "tags": [
                    "reviews"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
            "get": {
                "summary": "returns simple review",
                "tags": [
                    "reviews"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "description": "parameter id just for test",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Review"
                                },
                            }
                        }
                    },
                    "404": {
                        "description": "Not found"
                    },
                }
            },
        },
        "/reviews/course/{id}": {
            "get": {
                "summary": "get reviews by course",
                "tags": [
                    "reviews"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter just for test",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Review"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        "/reviews/author/{id}": {
            "get": {
                "summary": "get all reviews by author",
                "tags": [
                    "reviews"
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "simple parameter just for test",
                        "schema": {
                            "type": "string",
                            "example": "1"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Review"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
    },
};

