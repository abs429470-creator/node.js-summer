import * as coursesService from '../services/courses.js';

// GET /courses — כל הקורסים
export function getAll(req, res) {
    res.json(coursesService.getAllCourses());
}

// GET /courses/:id — קורס בודד
export function getOne(req, res) {
    const result = coursesService.getCourse(req.params.id);
    if (result.error) return res.status(404).json(result);
    res.json(result);
}

// POST /courses — יצירת קורס
export function create(req, res) {
    const result = coursesService.createCourse(req.body);
    if (result.error) return res.status(400).json(result);
    res.status(201).json(result);
}

// PUT /courses/:id — החלפה מלאה
export function update(req, res) {
    const result = coursesService.updateCourse(req.params.id, req.body);
    if (result.error) {
        if (result.error.includes('not found')) return res.status(404).json(result);
        return res.status(400).json(result);
    }
    res.json(result);
}

// PATCH /courses/:id — עדכון חלקי
export function patch(req, res) {
    const result = coursesService.patchCourse(req.params.id, req.body);
    if (result.error) {
        if (result.error.includes('not found')) return res.status(404).json(result);
        return res.status(400).json(result);
    }
    res.json(result);
}

// DELETE /courses/:id — מחיקה
export function remove(req, res) {
    const result = coursesService.deleteCourse(req.params.id);
    if (result.error) return res.status(404).json(result);
    res.json(result);
}
