# Course & Student Management API

A RESTful API built with Express.js for managing courses and students, including enrollment functionality.

## Project Structure

```
project/
├── app.js                    # Entry point — connects all modules, starts the server
├── middleware/
│   └── auth.js               # Authentication middleware — validates the auth-key header
├── routes/
│   ├── courses.js            # Course route definitions
│   ├── students.js           # Student route definitions (includes nested enrollment routes)
│   └── enrollment.js         # Enrollment route definitions (course → students)
├── controllers/
│   ├── courses.js            # Request handling — extracts params/body, sends HTTP responses
│   ├── students.js           # Request handling for student endpoints
│   └── enrollment.js         # Request handling for enrollment endpoints
├── services/
│   ├── courses.js            # Business logic — CRUD operations for courses
│   ├── students.js           # Business logic — CRUD operations for students
│   └── enrollment.js         # Business logic — enroll/unenroll, queries
├── data/
│   ├── courses.js            # In-memory course data store
│   └── students.js           # In-memory student data store
└── README.md
```

## Architecture

The project follows a layered architecture:

- **Routes** — Define endpoints and HTTP methods. Thin layer that delegates to controllers.
- **Controllers** — Extract request data, call service functions, return appropriate HTTP status codes.
- **Services** — Pure business logic. No `req`/`res` objects — receive plain data and return plain results.
- **Data** — In-memory arrays that serve as the database.

## Authentication

All endpoints under `/courses` and `/students` require an `auth-key` header:

```
auth-key: my-secret-auth-key-2024
```

Requests without a valid key receive a `401 Unauthorized` response.

> In a real project, the key should come from an environment variable (`process.env.AUTH_KEY`).

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

```bash
npm install
```

### Running the Server

```bash
node app.js
```

The server starts on `http://localhost:3000`.

## API Endpoints

### Public

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Server status (no auth required) |

### Courses

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/courses` | Get all courses |
| `GET` | `/courses/:id` | Get a single course |
| `POST` | `/courses` | Create a new course |
| `PUT` | `/courses/:id` | Full update of a course |
| `PATCH` | `/courses/:id` | Partial update of a course |
| `DELETE` | `/courses/:id` | Delete a course |
| `GET` | `/courses/:courseId/students` | Get all students enrolled in a course |

### Students

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/students` | Get all students |
| `GET` | `/students/:id` | Get a single student |
| `POST` | `/students` | Create a new student |
| `PUT` | `/students/:id` | Full update of a student |
| `PATCH` | `/students/:id` | Partial update of a student |
| `DELETE` | `/students/:id` | Delete a student |
| `POST` | `/students/:studentId/courses/:courseId` | Enroll a student in a course |
| `DELETE` | `/students/:studentId/courses/:courseId` | Cancel enrollment |
| `GET` | `/students/:studentId/courses` | Get all courses for a student |

## Examples

### Get all courses (with auth)

```bash
curl -H "auth-key: my-secret-auth-key-2024" http://localhost:3000/courses
```

### Create a course

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "auth-key: my-secret-auth-key-2024" \
  -d '{"name":"History","description":"World history overview"}' \
  http://localhost:3000/courses
```

### Enroll a student in a course

```bash
curl -X POST \
  -H "auth-key: my-secret-auth-key-2024" \
  http://localhost:3000/students/100000009/courses/14
```

## HTTP Status Codes Used

| Code | Meaning | When |
|------|---------|------|
| `200` | OK | Successful GET, PUT, PATCH, DELETE |
| `201` | Created | Successful POST (resource created) |
| `400` | Bad Request | Validation error |
| `401` | Unauthorized | Missing or invalid auth-key |
| `404` | Not Found | Resource does not exist |
| `409` | Conflict | Duplicate entry or already enrolled |
| `500` | Internal Server Error | Unexpected server error |

## Chat Log

All prompts and answers from this development session are documented in:  
[צאט 5 - prompts and answers.txt](צאט%205%20-%20prompts%20and%20answers.txt)
