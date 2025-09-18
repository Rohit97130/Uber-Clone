const express = require('express');
const router = express.Router();

const {body} = require('express-validator');
const userController = require('../controller/user.controller');


router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 character')
],
   userController.registerUser
)


module.exports = router;
