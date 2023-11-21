// Task1: initiate app and run server at 3000
require('dotenv').config();
require('./db/connect');
const employeeRoute = require('./routes/employeeRoute');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = new express();
app.use(morgan('dev'));
app.use(cors());

app.use('/api', employeeRoute);



// const path = require('path');
//const { config } = require('process');
// app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));


// Task2: create mongoDB connection 



//! dont delete this code. it connects the front end file.
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})

