import coursesArr from '../data/courses.js';
import studentsArr from '../data/students.js';

// מחזיר את כל הקורסים
export function getAllCourses() {
    return coursesArr;
}

// מחזיר קורס בודד לפי ID, או שגיאה
export function getCourse(id) {
    const course = coursesArr.find(c => c.id === id);
    if (!course) return { error: 'Course not found', id };
    return course;
}

// יוצר קורס חדש. name חובה. ID אוטומטי — המספר הכי קטן פנוי
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

// מעדכן קורס קיים — החלפה מלאה (PUT). name חובה.
export function updateCourse(id, { name, description }) {
    const course = coursesArr.find(c => c.id === id);
    if (!course) return { error: 'Course not found', id };
    if (!name || name.trim() === '') return { error: 'Name is required' };

    course.name = name;
    course.description = description || '';
    return course;
}

// עדכון חלקי של קורס (PATCH) — רק שדות שנשלחו מתעדכנים
export function patchCourse(id, updates) {
    const course = coursesArr.find(c => c.id === id);
    if (!course) return { error: 'Course not found', id };

    // מעדכן name רק אם נשלח
    if (updates.name !== undefined) {
        if (updates.name.trim() === '') return { error: 'Name cannot be empty' };
        course.name = updates.name;
    }

    // מעדכן description רק אם נשלח
    if (updates.description !== undefined) {
        course.description = updates.description;
    }

    return course;
}

// מוחק קורס, וגם מנקה אותו מרשימות הקורסים של כל הסטודנטים
export function deleteCourse(id) {
    const index = coursesArr.findIndex(c => c.id === id);
    if (index === -1) return { error: 'Course not found', id };

    const deleted = coursesArr.splice(index, 1)[0];

    // ניקוי הפניות יתומות — מסיר את ה-ID מכל סטודנט שנרשם לקורס
    studentsArr.forEach(s => {
        s.courses = s.courses.filter(courseId => courseId !== id);
    });

    return deleted;
}
