import express from 'express';
import chalk from 'chalk';
import coursesArr, { printCoursesToConsole } from './courses.js';
import studentsArr from './students.js';

const app = express();
const port = process.env.PORT
    || 3000;

// פונקציית עזר מרכזית לשליחת JSON
function sendJson(res, data, statusCode = 200) {
    res.status(statusCode).json(data);
}

// Route 1: שורש — מידע כללי על השרת
app.get('/', (req, res) => {
    sendJson(res, {
        status: 'running',
        description: 'Server for managing courses and students. Supports routes: /courses, /students'
    });
});

// Route 2: רשימת קורסים
app.get('/courses', (req, res) => {
    sendJson(res, coursesArr);
});

// Route 3: רשימת סטודנטים
app.get('/students', (req, res) => {
    sendJson(res, studentsArr);
});

// 404 — תופס כל בקשה שלא נמצא לה Route מתאים
app.use((req, res) => {
    sendJson(res, {
        error: 'Not Found',
        message: `No route found for ${req.method} ${req.url}`
    }, 404);
});

// Error handler — תופס שגיאות בלתי צפויות ומחזיר JSON במקום HTML
app.use((err, req, res, next) => {
    sendJson(res, {
        error: 'Internal Server Error',
        message: err.message
    }, 500);
});

// הרמת השרת
app.listen(port, () => {
    console.log(chalk.yellow(`Server is running at http://localhost:${port}/`));
    printCoursesToConsole();
});
