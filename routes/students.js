import { Router } from 'express';
import * as studentsController from '../controllers/students.js';
import * as enrollmentController from '../controllers/enrollment.js';

const router = Router();

// GET    /students              — כל הסטודנטים
router.get('/',                  studentsController.getAll);

// GET    /students/:id          — סטודנט בודד
router.get('/:id',               studentsController.getOne);

// POST   /students              — יצירת סטודנט
router.post('/',                 studentsController.create);

// PUT    /students/:id          — החלפה מלאה
router.put('/:id',               studentsController.update);

// PATCH  /students/:id          — עדכון חלקי
router.patch('/:id',             studentsController.patch);

// DELETE /students/:id          — מחיקת סטודנט
router.delete('/:id',            studentsController.remove);

// ── Enrollment מקונן בתוך סטודנטים ──

// POST   /students/:studentId/courses/:courseId   — רישום לקורס
router.post('/:studentId/courses/:courseId',       enrollmentController.enroll);

// DELETE /students/:studentId/courses/:courseId   — ביטול רישום
router.delete('/:studentId/courses/:courseId',     enrollmentController.unenroll);

// GET    /students/:studentId/courses             — קורסים של סטודנט
router.get('/:studentId/courses',                  enrollmentController.getStudentCourses);

export default router;
