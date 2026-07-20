import * as studentsService from '../services/students.js';

// GET /students — get all students
export function getAll(req, res) {
    res.json(studentsService.getAllStudents());
}

// GET /students/:id — get a single student
export function getOne(req, res) {
    const result = studentsService.getStudent(req.params.id);
    if (result.error) return res.status(404).json(result);
    res.json(result);
}

// POST /students — create a new student
export function create(req, res) {
    const result = studentsService.createStudent(req.body);
    if (result.error) {
        const status = result.error.includes('already exists') ? 409 : 400;
        return res.status(status).json(result);
    }
    res.status(201).json(result);
}

// PUT /students/:id — full replacement of a student
export function update(req, res) {
    const result = studentsService.updateStudent(req.params.id, req.body);
    if (result.error) {
        if (result.error.includes('not found')) return res.status(404).json(result);
        const status = result.error.includes('already exists') ? 409 : 400;
        return res.status(status).json(result);
    }
    res.json(result);
}

// PATCH /students/:id — partial update of a student
export function patch(req, res) {
    const result = studentsService.patchStudent(req.params.id, req.body);
    if (result.error) {
        if (result.error.includes('not found')) return res.status(404).json(result);
        const status = result.error.includes('already exists') ? 409 : 400;
        return res.status(status).json(result);
    }
    res.json(result);
}

// DELETE /students/:id — delete a student
export function remove(req, res) {
    const result = studentsService.deleteStudent(req.params.id);
    if (result.error) return res.status(404).json(result);
    res.json(result);
}
