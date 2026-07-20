import express from 'express';
import chalk from 'chalk';
import coursesRouter from './routes/courses.js';
import studentsRouter from './routes/students.js';
import enrollmentRouter from './routes/enrollment.js';
import { printCoursesToConsole } from './data/courses.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware: פענוח גוף בקשות JSON
app.use(express.json());

// Route: מידע כללי על השרת
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        description: 'Server managing courses and students. Supports /courses, /students'
    });
});

// חיבור Routers
app.use('/courses', coursesRouter);
app.use('/courses', enrollmentRouter);
app.use('/students', studentsRouter);

// 404 — תופס כל בקשה שלא נמצא לה Route מתאים
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `No route found for ${req.method} ${req.url}`
    });
});

// Error handler — תופס שגיאות בלתי צפויות ומחזיר JSON במקום HTML
app.use((err, req, res, next) => {
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// הרמת השרת
app.listen(port, () => {
    console.log(chalk.yellow(`Server is running at http://localhost:${port}/`));
    printCoursesToConsole();
});
