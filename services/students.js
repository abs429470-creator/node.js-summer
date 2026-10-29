import { readStudents, writeStudents } from '../data/students.js';

// Validates an Israeli ID number using the check-digit algorithm
export function isValidIsraeliId(id) {
    const digits = String(id).padStart(9, '0').split('').map(Number);
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        let val = digits[i] * ((i % 2) + 1);
        if (val > 9) val = Math.floor(val / 10) + (val % 10);
        sum += val;
    }
    return sum % 10 === 0;
}

// Returns all students
export function getAllStudents() {
    return readStudents();
}

// Returns a single student by ID, or an error object
export async function getStudent(id) {
    const students = await readStudents();
    const student = students.find(s => s.id === id);
    if (!student) return { error: 'Student not found', id };
    return student;
}

// Creates a new student. fullName, birthDate, and id are all required. ID must be a valid and unique Israeli ID number.
export async function createStudent({ fullName, birthDate, id }) {
    if (!fullName)  return { error: 'fullName is required' };
    if (!birthDate) return { error: 'birthDate is required' };
    if (!id)        return { error: 'id is required' };
    if (!isValidIsraeliId(id)) return { error: 'Invalid Israeli ID number' };

    const students = await readStudents();
    if (students.some(s => s.id === id)) {
        return { error: 'Student ID already exists', id };
    }

    const student = { id, fullName, birthDate, courses: [] };
    students.push(student);
    await writeStudents(students);
    return student;
}

// Fully replaces an existing student (PUT). All fields are required.
export async function updateStudent(currentId, { fullName, birthDate, id: newId }) {
    const students = await readStudents();
    const student = students.find(s => s.id === currentId);
    if (!student) return { error: 'Student not found', id: currentId };

    if (!fullName)  return { error: 'fullName is required' };
    if (!birthDate) return { error: 'birthDate is required' };
    if (!newId)     return { error: 'id is required' };
    if (!isValidIsraeliId(newId)) return { error: 'Invalid Israeli ID number' };
    if (newId !== currentId && students.some(s => s.id === newId)) {
        return { error: 'Student ID already exists', id: newId };
    }

    student.id = newId;
    student.fullName = fullName;
    student.birthDate = birthDate;
    await writeStudents(students);
    return student;
}

// Partially updates a student (PATCH) — only fields that were sent get updated
export async function patchStudent(id, updates) {
    const students = await readStudents();
    const student = students.find(s => s.id === id);
    if (!student) return { error: 'Student not found', id };

    if (updates.fullName !== undefined && updates.fullName !== null) {
        if (updates.fullName.trim() === '') return { error: 'fullName cannot be empty' };
        student.fullName = updates.fullName;
    }

    if (updates.birthDate !== undefined && updates.birthDate !== null) {
        if (updates.birthDate.trim() === '') return { error: 'birthDate cannot be empty' };
        student.birthDate = updates.birthDate;
    }

    if (updates.id !== undefined && updates.id !== null) {
        if (!isValidIsraeliId(updates.id)) return { error: 'Invalid Israeli ID number' };
        if (updates.id !== id && students.some(s => s.id === updates.id)) {
            return { error: 'Student ID already exists', id: updates.id };
        }
        student.id = updates.id;
    }

    await writeStudents(students);
    return student;
}

// Deletes a student by ID
export async function deleteStudent(id) {
    const students = await readStudents();
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return { error: 'Student not found', id };
    const deleted = students.splice(index, 1)[0];
    await writeStudents(students);
    return deleted;
}
