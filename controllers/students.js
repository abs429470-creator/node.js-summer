import * as studentsService from '../services/students.js';

// GET /students — כל הסטודנטים
export function getAll(req, res) {
    res.json(studentsService.getAllStudents());
}

// GET /students/:id — סטודנט בודד
export function getOne(req, res) {
    const result = studentsService.getStudent(req.params.id);
    if (result.error) return res.status(404).json(result);
    res.json(result);
}

// POST /students — יצירת סטודנט
export function create(req, res) {
    const result = studentsService.createStudent(req.body);
    if (result.error) {
        const status = result.error.includes('already exists') ? 409 : 400;
        return res.status(status).json(result);
    }
    res.status(201).json(result);
}

// PUT /students/:id — החלפה מלאה
export function update(req, res) {
    const result = studentsService.updateStudent(req.params.id, req.body);
    if (result.error) {
        if (result.error.includes('not found')) return res.status(404).json(result);
        const status = result.error.includes('already exists') ? 409 : 400;
        return res.status(status).json(result);
    }
    res.json(result);
}

// PATCH /students/:id — עדכון חלקי
export function patch(req, res) {
    const result = studentsService.patchStudent(req.params.id, req.body);
    if (result.error) {
        if (result.error.includes('not found')) return res.status(404).json(result);
        const status = result.error.includes('already exists') ? 409 : 400;
        return res.status(status).json(result);
    }
    res.json(result);
}

// DELETE /students/:id — מחיקה
export function remove(req, res) {
    const result = studentsService.deleteStudent(req.params.id);
    if (result.error) return res.status(404).json(result);
    res.json(result);
}
