
const { validationResult } = require('express-validator');
const mapService = require('../services/map.service');

module.exports.getCoordinate = async(req,res,next)=>{
     const errors = validationResult(req);

     if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array() });
     }


     const {address} = req.query;

     try{
       const coordinate = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinate);
     } 
     catch(error){
         res.status(404).json({message:'Coordination not Found'});
     }
}


module.exports.getDistanceTime = async(req,res,next)=>{
       
    try{
    const errors = validationResult(req);

     if(!errors.isEmpty()){
         return res.status(400).json({errors :errors.array()});
     }

     const {origin,destination} =  req.query;

     const distanceTime = await  mapService.getDistanceTime(origin, destination);
     console.log(distanceTime);
     

     res.status(200).json({distanceTime});

    }
    catch(err){
       console.error(err);
       res.status(500).json({message:'Internal Server errors'});
    }
    

}

module.exports.getAutoCompleteSuggestions = async(req,res,next)=>{

    try{
          const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {input} = req.query;

        console.log('my input is here ',input);
        

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    }
    catch(err){
       console.log(err);
       res.status(500).json({message:err});
    }
}

