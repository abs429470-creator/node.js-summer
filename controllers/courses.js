import * as coursesService from '../services/courses.js';
import { sendServerError } from '../utils/response.js';

// GET /courses — get all courses
export function getAll(req, res) {
    coursesService.getAllCourses()
        .then(courses => res.json(courses))
        .catch(err => sendServerError(res, err));
}

// GET /courses/:id — get a single course
export function getOne(req, res) {
    coursesService.getCourse(req.params.id)
        .then(result => {
            if (result.error) return res.status(404).json(result);
            res.json(result);
        })
        .catch(err => sendServerError(res, err));
}

// POST /courses — create a new course
export function create(req, res) {
    coursesService.createCourse(req.body)
        .then(result => {
            if (result.error) return res.status(400).json(result);
            res.status(201).json(result);
        })
        .catch(err => sendServerError(res, err));
}

// PUT /courses/:id — full replacement of a course
export function update(req, res) {
    coursesService.updateCourse(req.params.id, req.body)
        .then(result => {
            if (result.error) {
                if (result.error.includes('not found')) return res.status(404).json(result);
                return res.status(400).json(result);
            }
            res.json(result);
        })
        .catch(err => sendServerError(res, err));
}

// PATCH /courses/:id — partial update of a course
export function patch(req, res) {
    coursesService.patchCourse(req.params.id, req.body)
        .then(result => {
            if (result.error) {
                if (result.error.includes('not found')) return res.status(404).json(result);
                return res.status(400).json(result);
            }
            res.json(result);
        })
        .catch(err => sendServerError(res, err));
}

// DELETE /courses/:id — delete a course
export function remove(req, res) {
    coursesService.deleteCourse(req.params.id)
        .then(result => {
            if (result.error) return res.status(404).json(result);
            res.json(result);
        })
        .catch(err => sendServerError(res, err));
}
