import chalk from 'chalk';

const coursesArr = [
    { id: '1', name: 'Cooking', description: 'Learn how to cook' },
    { id: '2', name: 'Baking', description: 'Learn how to bake a cake' },
    { id: '3', name: 'Flute', description: 'Learn how to play the flute' },
    { id: '4', name: 'Sewing', description: 'Learn to sew and draw patterns' },
    { id: '5', name: 'Photography', description: 'Learn the basics of photography' },
    { id: '6', name: 'Gardening', description: 'How to grow your own vegetables' },
    { id: '7', name: 'Painting', description: 'Oil and watercolor painting techniques' },
    { id: '8', name: 'Guitar', description: 'Learn to play acoustic guitar' },
    { id: '9', name: 'Yoga', description: 'Beginner to advanced yoga practice' },
    { id: '10', name: 'Programming', description: 'Introduction to web development' },
    { id: '11', name: 'Chess', description: 'Master the game of chess' },
    { id: '12', name: 'Pottery', description: 'Create beautiful ceramic pieces' },
    { id: '13', name: 'Creative Writing', description: 'Write stories and poetry' },
    { id: '14', name: 'Mathematics', description: 'Algebra and geometry foundations' },
];

function printCoursesToConsole() {
    coursesArr.forEach(course => {
        console.log(chalk.blue.bgYellow(`${course.id}:`) + chalk.green(`${course.name} - ${course.description}`));
    });
}

export default coursesArr;
export { printCoursesToConsole };
