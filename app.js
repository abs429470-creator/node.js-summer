import express from 'express';
import chalk from 'chalk';
import coursesRouter from './routes/courses.js';
import studentsRouter from './routes/students.js';
import enrollmentRouter from './routes/enrollment.js';
import checkAuthKey from './middleware/auth.js';
import { printCoursesToConsole } from './data/courses.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware: Parse incoming JSON request bodies
app.use(express.json());

// Middleware: Authenticate all requests to protected paths
app.use('/courses', checkAuthKey);
app.use('/students', checkAuthKey);

// Route: General server info (public, no authentication required)
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        description: 'Server managing courses and students. Supports /courses, /students'
    });
});

// Connect routers
app.use('/courses', coursesRouter);
app.use('/courses', enrollmentRouter);
app.use('/students', studentsRouter);

// 404 handler — catches any request that doesn't match a defined route
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `No route found for ${req.method} ${req.url}`
    });
});

// Global error handler — catches unexpected errors and returns JSON instead of HTML
app.use((err, req, res, next) => {
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Start the server
app.listen(port, () => {
    console.log(chalk.yellow(`Server is running at http://localhost:${port}/`));
    printCoursesToConsole();
});
