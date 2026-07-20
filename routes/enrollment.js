import { Router } from 'express';
import * as enrollmentController from '../controllers/enrollment.js';

const router = Router();

// GET    /courses/:courseId/students  — כל הסטודנטים בקורס
router.get('/:courseId/students',      enrollmentController.getCourseStudents);

export default router;
