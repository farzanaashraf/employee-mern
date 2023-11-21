// Task1: initiate app and run server at 3000
require('dotenv').config();
require('./db/connect');

const path = require('path');
const employeeRoute = require('./routes/employeeRoute');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = new express();
app.use(morgan('dev'));
app.use(cors());

app.use('/api', employeeRoute);

app.use(express.static(path.join(__dirname + '/public')));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})

