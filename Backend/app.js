const dotenv = require('dotenv');
dotenv.config();


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



module.exports = app;



