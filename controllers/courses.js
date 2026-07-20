import * as coursesService from '../services/courses.js';

// GET /courses — get all courses
export function getAll(req, res) {
    res.json(coursesService.getAllCourses());
}

// GET /courses/:id — get a single course
export function getOne(req, res) {
    const result = coursesService.getCourse(req.params.id);
    if (result.error) return res.status(404).json(result);
    res.json(result);
}

// POST /courses — create a new course
export function create(req, res) {
    const result = coursesService.createCourse(req.body);
    if (result.error) return res.status(400).json(result);
    res.status(201).json(result);
}

// PUT /courses/:id — full replacement of a course
export function update(req, res) {
    const result = coursesService.updateCourse(req.params.id, req.body);
    if (result.error) {
        if (result.error.includes('not found')) return res.status(404).json(result);
        return res.status(400).json(result);
    }
    res.json(result);
}

// PATCH /courses/:id — partial update of a course
export function patch(req, res) {
    const result = coursesService.patchCourse(req.params.id, req.body);
    if (result.error) {
        if (result.error.includes('not found')) return res.status(404).json(result);
        return res.status(400).json(result);
    }
    res.json(result);
}

// DELETE /courses/:id — delete a course
export function remove(req, res) {
    const result = coursesService.deleteCourse(req.params.id);
    if (result.error) return res.status(404).json(result);
    res.json(result);
}
