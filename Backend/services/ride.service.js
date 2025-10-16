const rideModel = require('../models/ride.model');

const mapservice = require('./map.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


function getOtp(num){
     const min = 10 ** num-1; //inclusive //1000 -> 9999 for num3
     return crypto.randomInt(min, Math.pow(10,num));
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


module.exports.createRide = async({user,pickup,destination, vechicleType})=>{
  
    if(!user || !pickup || !destination || !vechicleType){
       throw new Error('ALL field are required');
    }


    const fare =  await getfare(pickup,destination);

    const ride =await rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(6),
        fare: fare[vechicleType]
    })

     return ride;
}


