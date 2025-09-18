const userModel = require('../models/user.model');
const {validationResult} = require('express-validator');
const  userServices = require('../services/user.services');


module.exports.registerUser = async(req,res)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({errors:errors.array()});
      }
      const {fullname,email,password} = req.body;

      const isUserAlready = userModel.findOne({email});

      if(isUserAlready){
            return res.json({message:'User has alredy register'});
      }

      const hashedPassword = await userModel.hashPassword(password);

      const user = userServices.createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashedPassword
      })

      const token = user.generateAuthToken();

      res.status(201).json({token,user});
      
       
}


