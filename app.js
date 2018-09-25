const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json())

const port = process.env.PORT || 3000;

const courses = [
    { id: 1, name: "Maths" },
    { id: 2, name: 'English' },
    { id: 3, name: 'French' }
];

app.get("/courses", (req, resp) => resp.send(courses));

app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == req.params.id);
    if (!course) res.status(404).send("Course not found");
    else res.send(course);
});

app.post('/courses', (req, resp) => {

    const { error } = validateSchema(req.body);

    if(error) return resp.status(400).send(error);


    const course = {
        id: courses[courses.length - 1].id + 1,
        name: req.body.name
    };
    courses.push(course);
    resp.send(course);
});


function validateSchema(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

app.listen(port, () => console.log(`Starting server in port ${port}`));

