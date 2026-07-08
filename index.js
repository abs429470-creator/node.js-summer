import express from 'express';
import chalk from 'chalk';
import coursesArr, { printCoursesToConsole } from './courses.js';
import studentsArr, { isValidIsraeliId } from './students.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware: פרסור גוף בקשות JSON
app.use(express.json());

// פונקציית עזר מרכזית לשליחת JSON
function sendJson(res, data, statusCode = 200) {
    res.status(statusCode).json(data);
}

// פונקציית עזר למציאת אובייקט — מחזירה 404 אוטומטית אם לא נמצא
function findOr404(arr, id, entityName, res, callback) {
    const index = arr.findIndex(item => item.id === id);
    if (index === -1) {
        return sendJson(res, { error: `${entityName} not found`, id }, 404);
    }
    return callback({ item: arr[index], index });
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

// Route 2b: קורס בודד לפי ID
app.get('/courses/:id', (req, res) => {
    findOr404(coursesArr, req.params.id, 'Course', res, ({ item }) => {
        sendJson(res, item);
    });
});

// Route 2c: הוספת קורס חדש
app.post('/courses', (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return sendJson(res, { error: 'Name is required' }, 400);
    }
    const existingIds = new Set(coursesArr.map(c => Number(c.id)));
    let newId = 1;
    while (existingIds.has(newId)) newId++;
    const newCourse = {
        id: String(newId),
        name,
        description: description || ''
    };
    coursesArr.push(newCourse);
    sendJson(res, newCourse, 201);
});

// Route 2d: עדכון קורס קיים (החלפה מלאה)
app.put('/courses/:id', (req, res) => {
    findOr404(coursesArr, req.params.id, 'Course', res, ({ item: course }) => {
        const { name, description } = req.body;
        if (!name) {
            return sendJson(res, { error: 'Name is required' }, 400);
        }
        course.name = name;
        course.description = description || '';
        sendJson(res, course);
    });
});

// Route 2e: מחיקת קורס
app.delete('/courses/:id', (req, res) => {
    findOr404(coursesArr, req.params.id, 'Course', res, ({ item, index }) => {
        coursesArr.splice(index, 1);
        studentsArr.forEach(s => {
            s.courses = s.courses.filter(courseId => courseId !== req.params.id);
        });
        sendJson(res, item);
    });
});

// Route 3: רשימת סטודנטים
app.get('/students', (req, res) => {
    sendJson(res, studentsArr);
});

// Route 3b: סטודנט בודד לפי ID
app.get('/students/:id', (req, res) => {
    findOr404(studentsArr, req.params.id, 'Student', res, ({ item }) => {
        sendJson(res, item);
    });
});

// Route 3c: הוספת סטודנט חדש
app.post('/students', (req, res) => {
    const { fullName, birthDate, id } = req.body;
    if (!fullName) {
        return sendJson(res, { error: 'fullName is required' }, 400);
    }
    if (!birthDate) {
        return sendJson(res, { error: 'birthDate is required' }, 400);
    }
    if (!id) {
        return sendJson(res, { error: 'id is required' }, 400);
    }
    if (!isValidIsraeliId(id)) {
        return sendJson(res, { error: 'Invalid Israeli ID number' }, 400);
    }
    if (studentsArr.some(s => s.id === id)) {
        return sendJson(res, { error: 'Student ID already exists', id }, 409);
    }
    const newStudent = {
        id,
        fullName,
        birthDate,
        courses: []
    };
    studentsArr.push(newStudent);
    sendJson(res, newStudent, 201);
});

// Route 3d: עדכון סטודנט קיים (החלפה מלאה)
app.put('/students/:id', (req, res) => {
    findOr404(studentsArr, req.params.id, 'Student', res, ({ item: student }) => {
        const { fullName, birthDate, id: newId } = req.body;
        if (!fullName) {
            return sendJson(res, { error: 'fullName is required' }, 400);
        }
        if (!birthDate) {
            return sendJson(res, { error: 'birthDate is required' }, 400);
        }
        if (!newId) {
            return sendJson(res, { error: 'id is required' }, 400);
        }
        if (!isValidIsraeliId(newId)) {
            return sendJson(res, { error: 'Invalid Israeli ID number' }, 400);
        }
        if (newId !== student.id && studentsArr.some(s => s.id === newId)) {
            return sendJson(res, { error: 'Student ID already exists', id: newId }, 409);
        }
        student.id = newId;
        student.fullName = fullName;
        student.birthDate = birthDate;
        sendJson(res, student);
    });
});

// Route 3e: מחיקת סטודנט
app.delete('/students/:id', (req, res) => {
    findOr404(studentsArr, req.params.id, 'Student', res, ({ item, index }) => {
        studentsArr.splice(index, 1);
        sendJson(res, item);
    });
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
