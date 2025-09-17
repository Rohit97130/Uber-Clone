const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const app = express();


const cors = require('cors');
app.use(cors());
// Middleware to parse JSON bodies


app.use(express.json());



module.exports = app;



