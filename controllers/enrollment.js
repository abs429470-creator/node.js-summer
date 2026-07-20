import * as enrollmentService from '../services/enrollment.js';

// POST /students/:studentId/courses/:courseId — enroll a student in a course
export function enroll(req, res) {
    const { studentId, courseId } = req.params;
    const result = enrollmentService.enrollStudent(studentId, courseId);
    if (result.error) {
        const status = result.error.includes('already enrolled') ? 409 : 404;
        return res.status(status).json(result);
    }
    res.status(201).json(result);
}

// DELETE /students/:studentId/courses/:courseId — cancel enrollment
export function unenroll(req, res) {
    const { studentId, courseId } = req.params;
    const result = enrollmentService.unenrollStudent(studentId, courseId);
    if (result.error) {
        const status = result.error.includes('not enrolled') ? 409 : 404;
        return res.status(status).json(result);
    }
    res.json(result);
}

// GET /students/:studentId/courses — get all courses of a student
export function getStudentCourses(req, res) {
    const result = enrollmentService.getStudentCourses(req.params.studentId);
    if (result.error) return res.status(404).json(result);
    res.json(result);
}

// GET /courses/:courseId/students — get all students in a course
export function getCourseStudents(req, res) {
    const result = enrollmentService.getCourseStudents(req.params.courseId);
    if (result.error) return res.status(404).json(result);
    res.json(result);
}
