const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const EmployeeData = require('../model/employeelist');


router.get("/employeelist", async (req, res) => {
    try {
        const data = await EmployeeData.find();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.get('/employeelist/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const item = await EmployeeData.findOne({ _id: id });
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json(error);
    }

});


//Request body format:{name:'',location:'',position:'',salary:''}
router.post('/employeelist', async (req, res) => {
    try {
        var item = req.body;
        // console.log(item);
        const employee = new EmployeeData(item);
        const result = await employee.save();
        console.log(result);
        res.status(200).json('successfully uploaded');
    } catch (error) {
        res.status(404).json(error);
    }
});


router.delete("/employeelist/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteItem = await EmployeeData.deleteOne({ _id: id });
        res.status(200).json('successfully deleted');
    } catch (error) {
        res.status(404).json(error);
    }

});


//Request body format:{name:'',location:'',position:'',salary:''}
router.put('/employeelist', async (req, res) => {
    try {
        const item = req.body;
        const result = await EmployeeData.findOneAndUpdate({ _id: item._id }, item);
        res.status(200).json('successfully deleted');
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
});

module.exports = router;