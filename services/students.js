import studentsArr from '../data/students.js';

// בודק תוקף תעודת זהות ישראלית לפי אלגוריתם ספרת ביקורת
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

// מחזיר את כל הסטודנטים
export function getAllStudents() {
    return studentsArr;
}

// מחזיר סטודנט בודד לפי ID, או שגיאה
export function getStudent(id) {
    const student = studentsArr.find(s => s.id === id);
    if (!student) return { error: 'Student not found', id };
    return student;
}

// יוצר סטודנט חדש. fullName, birthDate, id — כולם חובה. ת"ז חייבת להיות תקינה וייחודית.
export function createStudent({ fullName, birthDate, id }) {
    if (!fullName)  return { error: 'fullName is required' };
    if (!birthDate) return { error: 'birthDate is required' };
    if (!id)        return { error: 'id is required' };
    if (!isValidIsraeliId(id)) return { error: 'Invalid Israeli ID number' };
    if (studentsArr.some(s => s.id === id)) {
        return { error: 'Student ID already exists', id };
    }

    const student = { id, fullName, birthDate, courses: [] };
    studentsArr.push(student);
    return student;
}

// מעדכן סטודנט קיים — החלפה מלאה (PUT). כל השדות חובה.
export function updateStudent(currentId, { fullName, birthDate, id: newId }) {
    const student = studentsArr.find(s => s.id === currentId);
    if (!student) return { error: 'Student not found', id: currentId };

    if (!fullName)  return { error: 'fullName is required' };
    if (!birthDate) return { error: 'birthDate is required' };
    if (!newId)     return { error: 'id is required' };
    if (!isValidIsraeliId(newId)) return { error: 'Invalid Israeli ID number' };
    if (newId !== currentId && studentsArr.some(s => s.id === newId)) {
        return { error: 'Student ID already exists', id: newId };
    }

    student.id = newId;
    student.fullName = fullName;
    student.birthDate = birthDate;
    return student;
}

// עדכון חלקי של סטודנט (PATCH) — רק שדות שנשלחו מתעדכנים
export function patchStudent(id, updates) {
    const student = studentsArr.find(s => s.id === id);
    if (!student) return { error: 'Student not found', id };

    if (updates.fullName !== undefined) {
        if (updates.fullName.trim() === '') return { error: 'fullName cannot be empty' };
        student.fullName = updates.fullName;
    }

    if (updates.birthDate !== undefined) {
        if (updates.birthDate.trim() === '') return { error: 'birthDate cannot be empty' };
        student.birthDate = updates.birthDate;
    }

    if (updates.id !== undefined) {
        if (!isValidIsraeliId(updates.id)) return { error: 'Invalid Israeli ID number' };
        if (updates.id !== id && studentsArr.some(s => s.id === updates.id)) {
            return { error: 'Student ID already exists', id: updates.id };
        }
        student.id = updates.id;
    }

    return student;
}

// מוחק סטודנט לפי ID
export function deleteStudent(id) {
    const index = studentsArr.findIndex(s => s.id === id);
    if (index === -1) return { error: 'Student not found', id };
    const deleted = studentsArr.splice(index, 1)[0];
    return deleted;
}
