import studentsArr from '../data/students.js';
import coursesArr from '../data/courses.js';

// רושם סטודנט לקורס. בודק ששניהם קיימים ושהסטודנט לא רשום כבר.
export function enrollStudent(studentId, courseId) {
    const student = studentsArr.find(s => s.id === studentId);
    if (!student) return { error: 'Student not found', studentId };

    const course = coursesArr.find(c => c.id === courseId);
    if (!course) return { error: 'Course not found', courseId };

    // חוק עסקי: מניעת רישום כפול
    if (student.courses.includes(courseId)) {
        return { error: 'Student is already enrolled in this course', studentId, courseId };
    }

    student.courses.push(courseId);
    return { studentId, courseId, courseName: course.name, studentName: student.fullName };
}

// מבטל רישום של סטודנט מקורס
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

// מחזיר את כל הקורסים שסטודנט רשום אליהם
export function getStudentCourses(studentId) {
    const student = studentsArr.find(s => s.id === studentId);
    if (!student) return { error: 'Student not found', studentId };

    const enrolledCourses = coursesArr.filter(c => student.courses.includes(c.id));
    return enrolledCourses;
}

// מחזיר את כל הסטודנטים הרשומים לקורס מסוים
export function getCourseStudents(courseId) {
    const course = coursesArr.find(c => c.id === courseId);
    if (!course) return { error: 'Course not found', courseId };

    const enrolledStudents = studentsArr.filter(s => s.courses.includes(courseId));
    return enrolledStudents;
}
