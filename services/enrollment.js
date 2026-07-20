import studentsArr from '../data/students.js';
import coursesArr from '../data/courses.js';

// Enrolls a student in a course. Validates that both exist and the student is not already enrolled.
export function enrollStudent(studentId, courseId) {
    const student = studentsArr.find(s => s.id === studentId);
    if (!student) return { error: 'Student not found', studentId };

    const course = coursesArr.find(c => c.id === courseId);
    if (!course) return { error: 'Course not found', courseId };

    // Business rule: prevent duplicate enrollment
    if (student.courses.includes(courseId)) {
        return { error: 'Student is already enrolled in this course', studentId, courseId };
    }

    student.courses.push(courseId);
    return { studentId, courseId, courseName: course.name, studentName: student.fullName };
}

// Unenrolls a student from a course
export function unenrollStudent(studentId, courseId) {
    const student = studentsArr.find(s => s.id === studentId);
    if (!student) return { error: 'Student not found', studentId };

    const course = coursesArr.find(c => c.id === courseId);
    if (!course) return { error: 'Course not found', courseId };

    const courseIndex = student.courses.indexOf(courseId);
    if (courseIndex === -1) {
        return { error: 'Student is not enrolled in this course', studentId, courseId };
    }

    student.courses.splice(courseIndex, 1);
    return { studentId, courseId, courseName: course.name };
}

// Returns all courses a student is enrolled in
export function getStudentCourses(studentId) {
    const student = studentsArr.find(s => s.id === studentId);
    if (!student) return { error: 'Student not found', studentId };

    const enrolledCourses = coursesArr.filter(c => student.courses.includes(c.id));
    return enrolledCourses;
}

// Returns all students enrolled in a specific course
export function getCourseStudents(courseId) {
    const course = coursesArr.find(c => c.id === courseId);
    if (!course) return { error: 'Course not found', courseId };

    const enrolledStudents = studentsArr.filter(s => s.courses.includes(courseId));
    return enrolledStudents;
}
