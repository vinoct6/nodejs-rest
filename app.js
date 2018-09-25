const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./logger');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
const courses = require('./routes/courses');

//Print environments - Reads NODE_ENV
console.log(`app : ${app.get('env')}`);

app.use(express.json());
app.use(logger);
app.use(express.static('public'));
app.use("/api/courses", courses);

//Use Morgan only for development purposes

if (app.get('env') === 'development') {
    /*You can enable this using export DEBUG=app:startup, or 
    DEBUG=app:x,
    DEBUG=app:*,  
    or just start with $DEBUG=app:startup node app.js
    */

    debug('use Morgan');
    app.use(morgan('tiny'));
}

//Use configuration
console.log(`The name of the application :  ${config.get('name')}`);
console.log(`Mail server :  ${config.get('mail.server')}`);
console.log(`Password from environment variable :  ${config.get('mail.password')}`);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Starting server in port ${port}`));

