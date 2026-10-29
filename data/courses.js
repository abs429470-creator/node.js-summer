import chalk from 'chalk';
import { readJson, writeJson } from './fileStore.js';

// Returns a Promise for all courses (read from courses.json)
export function readCourses() {
    return readJson('courses');
}

// Saves the given courses array to courses.json (a Promise)
export function writeCourses(courses) {
    return writeJson('courses', courses);
}

// Reads the courses file and prints them to the console
export async function printCoursesToConsole() {
    const courses = await readCourses();
    courses.forEach(course => {
        console.log(chalk.blue.bgYellow(`${course.id}:`) + chalk.green(`${course.name} - ${course.description}`));
    });
}
