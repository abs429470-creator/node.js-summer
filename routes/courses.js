import { Router } from 'express';
import * as coursesController from '../controllers/courses.js';

const router = Router();

// GET    /courses          — כל הקורסים
router.get('/',             coursesController.getAll);

// GET    /courses/:id      — קורס בודד
router.get('/:id',          coursesController.getOne);

// POST   /courses          — יצירת קורס
router.post('/',            coursesController.create);

// PUT    /courses/:id      — החלפה מלאה
router.put('/:id',          coursesController.update);

// PATCH  /courses/:id      — עדכון חלקי
router.patch('/:id',        coursesController.patch);

// DELETE /courses/:id      — מחיקת קורס
router.delete('/:id',       coursesController.remove);

export default router;
