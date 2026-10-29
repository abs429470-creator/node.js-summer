import * as enrollmentService from '../services/enrollment.js';
import { sendServerError } from '../utils/response.js';

// POST /students/:studentId/courses/:courseId — enroll a student in a course
export function enroll(req, res) {
    const { studentId, courseId } = req.params;
    enrollmentService.enrollStudent(studentId, courseId)
        .then(result => {
            if (result.error) {
                const status = result.error.includes('already enrolled') ? 409 : 404;
                return res.status(status).json(result);
            }
            res.status(201).json(result);
        })
        .catch(err => sendServerError(res, err));
}

// DELETE /students/:studentId/courses/:courseId — cancel enrollment
export function unenroll(req, res) {
    const { studentId, courseId } = req.params;
    enrollmentService.unenrollStudent(studentId, courseId)
        .then(result => {
            if (result.error) {
                const status = result.error.includes('not enrolled') ? 409 : 404;
                return res.status(status).json(result);
            }
            res.json(result);
        })
        .catch(err => sendServerError(res, err));
}

// GET /students/:studentId/courses — get all courses of a student
export function getStudentCourses(req, res) {
    enrollmentService.getStudentCourses(req.params.studentId)
        .then(result => {
            if (result.error) return res.status(404).json(result);
            res.json(result);
        })
        .catch(err => sendServerError(res, err));
}

// GET /courses/:courseId/students — get all students in a course
export function getCourseStudents(req, res) {
    enrollmentService.getCourseStudents(req.params.courseId)
        .then(result => {
            if (result.error) return res.status(404).json(result);
            res.json(result);
        })
        .catch(err => sendServerError(res, err));
}
