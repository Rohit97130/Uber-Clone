const ridemodel = require('../models/ride.model');

const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service')
const mapservice = require('../services/map.service')


// const createRide = async(req,res,next)=>{
//       const  errors =  validationResult(req);
//       if(!errors.isEmpty()){
//           return res.status(400).json({errors: errors.array()})
//       }

//       const {userId,pickup,destination,vechicleType} = req.body;

//       try{
//          const ride = rideService.createRide({user:userId,pickup,destination,vechicleType});
//          res.status(201).json(ride);
       
//           const pickupCoordinates = await  mapservice.getAddressCoordinate(pickup);


//       }
//       catch(err){
//         console.log(err);
//         return res.status(500).json({ message: err.message });
//       }
// }

module.exports.getFare = async(req,res,next)=>{
      const errors = validationResult(req);

      if(!errors.isEmpty()){
         return res.status(401).json({errors:errors.array()})
      }

      const{pickup,destination} = req.query;

        try{
          const response = await rideService.getfare(pickup,destination);
           return res.status(200).json(response);
        }
        catch(err){
           console.log(err);
           res.status(500).json({message:'some error might occcur'}); 
        }
}
