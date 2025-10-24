const ridemodel = require('../models/ride.model');

const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service')
const mapservice = require('../services/map.service')

const { sendMessageToSocketId } = require('../socket.io');


module.exports.createRide = async(req,res,next)=>{
      const  errors =  validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()})
      }

      const {pickup,destination,vehicleType} = req.body;

      try{
         const ride = await rideService.createRide({user:req.user._id,pickup,destination,vehicleType});
          res.status(201).json({ride});
          // console.log('my ride is ',ride);
          
          const pickupCoordinates = await  mapservice.getAddressCoordinate(pickup);
          // console.log('pickup',pickupCoordinates);
          
          

          const captainInRadius = await mapservice.getCaptainsInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,3);
          // console.log('my captainInRadius is -->>',captainInRadius);
          
           const rideWithUser = await ridemodel.findOne({ _id: ride._id }).populate('user');
         //   console.log('my ridewithUser is -->>', rideWithUser);


          captainInRadius.map(captain =>{
              sendMessageToSocketId(captain.socketId,{
                 event:'new-ride',
                 data:rideWithUser
              })
          })
      }
      catch(err){
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
}

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



module.exports.confirmRide = async(req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {rideId} = req.body;
     
         
      try{
          const ride =  await rideService.confirmRide({rideId,captain:req.captain});
        
          
         sendMessageToSocketId(ride.user.socketId,{
              event:'ride-confirmed',
              data:ride
         })
         res.status(200).json(ride)
      }
      catch(err){
          console.log(err);
          return res.status(500).json({message:err.message});
      }
}






module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rideId,otp} = req.query;

      try{
         const ride = await rideService.startRide({rideId,otp,captain:req.captain});

         sendMessageToSocketId(ride.user.socketId,{
            event:'ride-started',
            data:ride
         })

         return res.status(200).json(ride);
      }
      catch(err){
         res.status(200).json({message:err.message});
      }
   }




module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
     const {rideId} = req.body;

    try{
      const ride  = await rideService.endRide({rideId, captain:req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride);
    }
       catch(err){
         res.status(500).json({message:err.message});
      }

   }



