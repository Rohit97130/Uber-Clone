
const rideModel = require('../models/ride.model');
const { findOne } = require('../models/user.model');

const mapservice = require('./map.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


function getOtp(num){
     const min = 10 ** (num-1); // For 6 digits: 10^5 = 100000 (minimum 6-digit number)
     const max = (10 ** num); // For 6 digits: 10^6 - 1 = 999999 (maximum 6-digit number)
     return crypto.randomInt(min, max);
}

async function getfare(pickup,destination){
      
      if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapservice.getDistanceTime(pickup,destination);

    const base = {
        auto:30,
        car:50,
        moto:20
    }
    const perKmRate ={
        auto:10,
        car:15,
        moto:8
    }

    const perMinuteRate = {
        auto:2,
        car:3,
        moto:1.5
    }
   
    const fare = {
        auto: Math.round(base.auto + ((distanceTime.distance.value/1000)* perKmRate.auto) + (((distanceTime.duration.value)/60) * perMinuteRate.auto )),
        car: Math.round (base.car + ((distanceTime.distance.value/1000)* perKmRate.car) + (((distanceTime.duration.value)/60) * perMinuteRate.car )),
        premiumCar: Math.round (base.car + ((distanceTime.distance.value/1000)* perKmRate.car) + (((distanceTime.duration.value)/60) * perMinuteRate.car ))+40,
        moto: Math.round(base.moto + ((distanceTime.distance.value/1000)* perKmRate.moto) + (((distanceTime.duration.value)/60) * perMinuteRate.moto )),
    };
   
    return fare;
}

module.exports.getfare = getfare;


module.exports.createRide = async({user,pickup,destination, vehicleType})=>{
  
    if(!user || !pickup || !destination || !vehicleType){
      console.log(user,pickup,destination,vehicleType);
      
       throw new Error('ALL field are required');
    }


    const fare =  await getfare(pickup,destination);

    const ride =await rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(6),
        fare: fare[vehicleType]
    })

     return ride;
}



module.exports.confirmRide =async({rideId,captain})=>{
     
    if(!rideId){
        throw new Error('Ride Id is required');
    }

     await rideModel.findOneAndUpdate({
          _id:rideId
     },{
         status:'accepted',
         captain:captain._id
     })


     const ride = await rideModel.findOne({
        _id:rideId
     }).populate('user').populate('captain').select('+otp');

     if(!ride){
        throw new Error('Ride not found')
     }
    
     return ride;
}


module.exports.startRide = async({rideId,otp,captain})=>{
    
    if(!rideId || !otp){
        throw new Error('RideId and Otp is required');
    }

    const ride = await rideModel.findOne({_id:rideId}).populate('user')
    .populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }


    await rideModel.findByIdAndUpdate(rideId,{
        status:'ongoing'
    });

    return ride;

}


module.exports.endRide = async({rideId, captain})=>{
     if (!rideId) {
        throw new Error('Ride id is required');
    }

     const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');


     if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }


      await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}

