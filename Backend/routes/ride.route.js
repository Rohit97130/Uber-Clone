const express = require('express');
const router = express.Router();
const authmiddleware = require('../middleware/auth.middleware');
const rideController = require('../controller/ride.controller');
const {body,query} = require('express-validator');



router.post('/create',
    authmiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['premiumCar','auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    rideController.createRide
)


router.get('/get-fare',
    authmiddleware.authUser,
    [
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    ],
    rideController.getFare
)    

router.get('/start-ride',
    authmiddleware.authCaptain,
    [
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
],
 rideController.startRide

)

router.post('/confirm',
     authmiddleware.authCaptain,
    [body('rideId').isMongoId().withMessage('Invalid ride id')],
    rideController.confirmRide
)


router.post('/end-ride',
    authmiddleware.authCaptain,
    [body('rideId').isMongoId().withMessage('Invalid ride id')],
    rideController.endRide
) 


module.exports = router;