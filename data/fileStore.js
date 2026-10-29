import { readFile, writeFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// The folder that contains this module — where the JSON files live
const DATA_DIR = path.dirname(fileURLToPath(import.meta.url));

// Builds the full path to a data file, e.g. filePath('courses') -> .../data/courses.json
function filePath(name) {
    return path.join(DATA_DIR, `${name}.json`);
}

// Reads a JSON file and returns the parsed data (a Promise)
export async function readJson(name) {
    const raw = await readFile(filePath(name), 'utf8');
    return JSON.parse(raw);
}

// Writes data to a JSON file (a Promise).
// Writes to a temp file first and then renames it, so the real file
// is never left half-written if the server stops in the middle.
export async function writeJson(name, data) {
    const target = filePath(name);
    const temp = `${target}.tmp`;
    await writeFile(temp, JSON.stringify(data, null, 2), 'utf8');
    await rename(temp, target);
}
