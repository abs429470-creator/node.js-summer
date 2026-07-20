import coursesArr from '../data/courses.js';
import studentsArr from '../data/students.js';

// Returns all courses
export function getAllCourses() {
    return coursesArr;
}

// Returns a single course by ID, or an error object
export function getCourse(id) {
    const course = coursesArr.find(c => c.id === id);
    if (!course) return { error: 'Course not found', id };
    return course;
}

// Creates a new course. `name` is required. Auto-generates the lowest available ID.
export function createCourse({ name, description }) {
    if (!name || name.trim() === '') return { error: 'Name is required' };

    const existingIds = new Set(coursesArr.map(c => Number(c.id)));
    let newId = 1;
    while (existingIds.has(newId)) newId++;

    const course = {
        id: String(newId),
        name,
        description: description || ''
    };

    coursesArr.push(course);
    return course;
}

// Fully replaces an existing course (PUT). `name` is required.
export function updateCourse(id, { name, description }) {
    const course = coursesArr.find(c => c.id === id);
    if (!course) return { error: 'Course not found', id };
    if (!name || name.trim() === '') return { error: 'Name is required' };

    course.name = name;
    course.description = description || '';
    return course;
}

// Partially updates a course (PATCH) — only fields that were sent get updated
export function patchCourse(id, updates) {
    const course = coursesArr.find(c => c.id === id);
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

    return course;
}

// Deletes a course and removes it from all enrolled students' course lists
export function deleteCourse(id) {
    const index = coursesArr.findIndex(c => c.id === id);
    if (index === -1) return { error: 'Course not found', id };

    const deleted = coursesArr.splice(index, 1)[0];

    // Clean up orphaned references — remove the course ID from all enrolled students
    studentsArr.forEach(s => {
        s.courses = s.courses.filter(courseId => courseId !== id);
    });

    return deleted;
}
