const express = require('express')
const app = express();
const db= require('./db');
const passport = require('./auth');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT || 3000;

//Middleware functions
const logRequest = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}] Request made  to : ${req.originalUrl}`);
    next();// move to next phase 
}
app.use(logRequest);

//middleware for authentication
passport.use(passport.initialize());
const localAuthMiddleware =passport.authenticate('local',{session:false});

app.get('/', function (req, res) {
    res.send('Welcome to my Chotu Dhaba,we serve best dishes ')
});

// Import the router files
const personRoutes = require('./routes/personRoute');
//use the routes
app.use('/person',localAuthMiddleware,personRoutes);

const MenuItem=require('./routes/menuRoutes');
app.use('/menu',MenuItem);


app.listen(PORT,()=>{
    console.log('listening on port 3000')
});