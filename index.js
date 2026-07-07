import http from 'http';
import chalk from 'chalk';
const port = process.env.PORT
    || 3000;
//Array of courses
const coursesArr = [
    { id: '1', name: 'cooking', description: 'learn how to cook' },
    { id: '2', name: 'baking', description: 'learn how to bake a cake' },
    { id: '3', name: 'Flute', description: 'Learning how to play the flute' },
    { id: '4', name: 'Sewing', description: 'Learning to sew and draw patterns' }
];
//Converting the array to a string
let output = '';
coursesArr.forEach(course => {
    output += `${course.id}: ${course.name} - ${course.description}\n`;
});
//build server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(output);
});
//Waiting to be read from the browser
server.listen(port, () => {
    console.log(chalk.yellow(`Server is running at http://localhost:${port}/`));
    coursesArr.forEach(course => {
        console.log(chalk.blue.bgYellow(`${course.id}:`) + chalk.green(`${course.name} - ${course.description}`));
    });
})
