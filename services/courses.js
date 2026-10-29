import { readCourses, writeCourses } from '../data/courses.js';
import { readStudents, writeStudents } from '../data/students.js';

// Returns all courses
export function getAllCourses() {
    return readCourses();
}

// Returns a single course by ID, or an error object
export async function getCourse(id) {
    const courses = await readCourses();
    const course = courses.find(c => c.id === id);
    if (!course) return { error: 'Course not found', id };
    return course;
}

// Creates a new course. `name` is required. Auto-generates the lowest available ID.
export async function createCourse({ name, description }) {
    if (!name || name.trim() === '') return { error: 'Name is required' };

    const courses = await readCourses();

    const existingIds = new Set(courses.map(c => Number(c.id)));
    let newId = 1;
    while (existingIds.has(newId)) newId++;

    const course = {
        id: String(newId),
        name,
        description: description || ''
    };

    courses.push(course);
    await writeCourses(courses);
    return course;
}

// Fully replaces an existing course (PUT). `name` is required.
export async function updateCourse(id, { name, description }) {
    const courses = await readCourses();
    const course = courses.find(c => c.id === id);
    if (!course) return { error: 'Course not found', id };
    if (!name || name.trim() === '') return { error: 'Name is required' };

    course.name = name;
    course.description = description || '';
    await writeCourses(courses);
    return course;
}

// Partially updates a course (PATCH) — only fields that were sent get updated
export async function patchCourse(id, updates) {
    const courses = await readCourses();
    const course = courses.find(c => c.id === id);
    if (!course) return { error: 'Course not found', id };

    // Update name only if it was sent
    if (updates.name !== undefined && updates.name !== null) {
        if (updates.name.trim() === '') return { error: 'Name cannot be empty' };
        course.name = updates.name;
    }

    // Update description only if it was sent
    if (updates.description !== undefined) {
        course.description = updates.description;
    }

    await writeCourses(courses);
    return course;
}

// Deletes a course and removes it from all enrolled students' course lists
export async function deleteCourse(id) {
    const courses = await readCourses();
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return { error: 'Course not found', id };

    const deleted = courses.splice(index, 1)[0];
    await writeCourses(courses);

    // Clean up orphaned references — remove the course ID from all enrolled students
    const students = await readStudents();
    students.forEach(s => {
        s.courses = s.courses.filter(courseId => courseId !== id);
    });
    await writeStudents(students);

    return deleted;
}
