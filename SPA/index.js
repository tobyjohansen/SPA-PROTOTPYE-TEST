const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());



app.use(function(req, res, next) {
    console.log('Logging...');
    next();
})

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});



app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is required and should be minimum 3 character');
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id not found');

    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is required and should be minimum 3 character');
        return;
    }

    course.name = req.body.name;
    res.send(course);
})


app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course);
})



app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id not found');
    res.send(course);
})


app.listen(9000, () => console.log('Listening on Port 9000...'));