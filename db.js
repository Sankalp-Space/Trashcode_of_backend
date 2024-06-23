const mongoose = require('mongoose');

require('dotenv').config();

//define the MongoDB connection URL
//const mongoURL=process.env.MONGODB_URL_LOCAL;
const mongoURL=process.env.DB_URL;
mongoose.connect(mongoURL);

const db = mongoose.connection;
db.on('connected', ()=>{
    console.log('Connected to MongoDB server'
    )
});

db.on('error', (err)=>{
    console.log('Error connecting to MongoDB server',err)
});

db.on('disconnected', ()=>{
    console.log('Disconnected from MongoDB server'
    )
});

//export the databse connection
module.exports =db;
