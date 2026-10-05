# Student Management REST API

A simple REST API built with Node.js and Express for managing student records. Data is stored in an in-memory JavaScript array, so changes reset when the server restarts.

## Features

- List all students and retrieve a student by ID
- Create, update, and delete student records
- Modular Express router and request logging middleware
- Input validation with clear 400 and 404 error responses
- Postman collection for trying the endpoints

## Run locally

1. Install Node.js (version 18 or later).
2. In the project folder, run: npm install
3. Start the server: npm start
4. The API is available at http://localhost:3000.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | /api/students | List all students |
| GET | /api/students/:id | Get one student |
| POST | /api/students | Create a student |
| PUT | /api/students/:id | Replace a student's name, age, and course |
| DELETE | /api/students/:id | Delete a student |

A student needs a non-empty name, an integer age from 1 to 120, and a non-empty course. Example request body: { "name": "Sam Lee", "age": 21, "course": "Web Development" }.

Successful creation returns 201. Invalid input or IDs return 400, and a valid ID with no matching student returns 404. Other successful requests return 200.

## Postman

Import postman/Student-Management-API.postman_collection.json into Postman. Start the server, then run the requests in order; the collection uses http://localhost:3000 as its base URL. Create, update, and delete requests use sample IDs and data that can be adjusted as needed.

## Project structure

- app.js: Express app, middleware, routes, and server startup
- routes/studentRoutes.js: student CRUD endpoints
- middleware/logger.js: request method, URL, status, and duration logging
- data/students.js: in-memory sample students
- postman/: API request collection
