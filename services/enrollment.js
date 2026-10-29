import { readStudents, writeStudents } from '../data/students.js';
import { readCourses } from '../data/courses.js';

// Enrolls a student in a course. Validates that both exist and the student is not already enrolled.
export async function enrollStudent(studentId, courseId) {
    const students = await readStudents();
    const student = students.find(s => s.id === studentId);
    if (!student) return { error: 'Student not found', studentId };

    const courses = await readCourses();
    const course = courses.find(c => c.id === courseId);
    if (!course) return { error: 'Course not found', courseId };

    // Business rule: prevent duplicate enrollment
    if (student.courses.includes(courseId)) {
        return { error: 'Student is already enrolled in this course', studentId, courseId };
    }

    student.courses.push(courseId);
    await writeStudents(students);
    return { studentId, courseId, courseName: course.name, studentName: student.fullName };
}

// Unenrolls a student from a course
export async function unenrollStudent(studentId, courseId) {
    const students = await readStudents();
    const student = students.find(s => s.id === studentId);
    if (!student) return { error: 'Student not found', studentId };

    const courses = await readCourses();
    const course = courses.find(c => c.id === courseId);
    if (!course) return { error: 'Course not found', courseId };

    const courseIndex = student.courses.indexOf(courseId);
    if (courseIndex === -1) {
        return { error: 'Student is not enrolled in this course', studentId, courseId };
    }

    student.courses.splice(courseIndex, 1);
    await writeStudents(students);
    return { studentId, courseId, courseName: course.name };
}

// Returns all courses a student is enrolled in
export async function getStudentCourses(studentId) {
    const students = await readStudents();
    const student = students.find(s => s.id === studentId);
    if (!student) return { error: 'Student not found', studentId };

    const courses = await readCourses();
    const enrolledCourses = courses.filter(c => student.courses.includes(c.id));
    return enrolledCourses;
}

// Returns all students enrolled in a specific course
export async function getCourseStudents(courseId) {
    const courses = await readCourses();
    const course = courses.find(c => c.id === courseId);
    if (!course) return { error: 'Course not found', courseId };

    const students = await readStudents();
    const enrolledStudents = students.filter(s => s.courses.includes(courseId));
    return enrolledStudents;
}
