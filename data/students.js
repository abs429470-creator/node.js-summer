import { readJson, writeJson } from './fileStore.js';

// Returns a Promise for all students (read from students.json)
export function readStudents() {
    return readJson('students');
}

// Saves the given students array to students.json (a Promise)
export function writeStudents(students) {
    return writeJson('students', students);
}
