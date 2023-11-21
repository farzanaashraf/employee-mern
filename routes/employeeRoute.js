const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const EmployeeData = require('../model/employeelist');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const token = req.headers['x-auth-token'];
 
    if(!token) {
        res.status(401).send('unauthorised');
        return;
    }

    const payload = jwt.verify(token,'mernapp');
   
    if(!payload){
        res.status(401).send('unauthorised');
        return;
    }
    res.locals.authUser = payload;
    next();
}
function verifyAdminRole(req, res, next){
   if( res.locals.authUser.role == 'ADMIN'){
        next();
   }
   else{
        res.status(401).send('unauthorised');
        return;
   }
}
router.get("/employeelist",verifyToken, async (req, res) => {
    try {
        const data = await EmployeeData.find();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.get('/employeelist/:id',verifyToken,verifyAdminRole, async (req, res) => {
    try {
        const id = req.params.id;
        const item = await EmployeeData.findOne({ _id: id });
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json(error);
    }

});


router.post('/employeelist',verifyToken,verifyAdminRole, async (req, res) => {
    try {
        var item = req.body;
        console.log(item);
        const employee = new EmployeeData(item);
        const result = await employee.save();
        console.log(result);
        res.status(200).json('successfully uploaded');
    } catch (error) {
        res.status(404).json(error);
    }
});

router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        if (email == 'admin' && password == 'admin@123') {
            let payload = { email , password, role : 'ADMIN' };
            let token = jwt.sign(payload, 'mernapp');

            res.status(200).send({ message:'adminsuccess',token })
        }
        else if(email == 'user' && password == 'user@123'){
            let payload = { email , password , role: 'USER' };
            let token = jwt.sign(payload, 'mernapp');

            res.status(200).send({ message:'usersuccess',token })
        }
        else {
            res.status(401).send({ message: 'unauthorised' });
        }
    }
    catch (error) {
        res.status(400).send({ message: 'not found' });
    }
});

router.delete("/employeelist/:id",verifyToken,verifyAdminRole, async (req, res) => {
    try {
        const id = req.params.id;
        const deleteItem = await EmployeeData.deleteOne({ _id: id });
        res.status(200).json('successfully deleted');
    } catch (error) {
        res.status(404).json(error);
    }

});



router.put('/employeelist',verifyToken,verifyAdminRole, async (req, res) => {
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