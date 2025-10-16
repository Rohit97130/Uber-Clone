const dotenv = require('dotenv');
dotenv.config();

const captainRoutes = require('./routes/captain.routes');
const map_route = require('./routes/map.routes');
const rides_route = require('./routes/ride.route');


const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const userRoute = require('./routes/user.routes');


const cors = require('cors');
app.use(cors());
// Middleware to parse JSON bodies


app.use(express.json());
app.use('/users',userRoute);
app.use('/captains',captainRoutes);
app.use('/maps',map_route);
app.use('/rides',rides_route);



module.exports = app;



