const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
});

const EmployeeDatas = mongoose.model('employe',employeeSchema);
module.exports = EmployeeDatas;