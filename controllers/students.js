import * as studentsService from '../services/students.js';
import { sendServerError } from '../utils/response.js';

// GET /students — get all students
export function getAll(req, res) {
    studentsService.getAllStudents()
        .then(students => res.json(students))
        .catch(err => sendServerError(res, err));
}

// GET /students/:id — get a single student
export function getOne(req, res) {
    studentsService.getStudent(req.params.id)
        .then(result => {
            if (result.error) return res.status(404).json(result);
            res.json(result);
        })
        .catch(err => sendServerError(res, err));
}

// POST /students — create a new student
export function create(req, res) {
    studentsService.createStudent(req.body)
        .then(result => {
            if (result.error) {
                const status = result.error.includes('already exists') ? 409 : 400;
                return res.status(status).json(result);
            }
            res.status(201).json(result);
        })
        .catch(err => sendServerError(res, err));
}

// PUT /students/:id — full replacement of a student
export function update(req, res) {
    studentsService.updateStudent(req.params.id, req.body)
        .then(result => {
            if (result.error) {
                if (result.error.includes('not found')) return res.status(404).json(result);
                const status = result.error.includes('already exists') ? 409 : 400;
                return res.status(status).json(result);
            }
            res.json(result);
        })
        .catch(err => sendServerError(res, err));
}

// PATCH /students/:id — partial update of a student
export function patch(req, res) {
    studentsService.patchStudent(req.params.id, req.body)
        .then(result => {
            if (result.error) {
                if (result.error.includes('not found')) return res.status(404).json(result);
                const status = result.error.includes('already exists') ? 409 : 400;
                return res.status(status).json(result);
            }
            res.json(result);
        })
        .catch(err => sendServerError(res, err));
}

// DELETE /students/:id — delete a student
export function remove(req, res) {
    studentsService.deleteStudent(req.params.id)
        .then(result => {
            if (result.error) return res.status(404).json(result);
            res.json(result);
        })
        .catch(err => sendServerError(res, err));
}
