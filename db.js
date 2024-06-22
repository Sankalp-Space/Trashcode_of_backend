const mongoose = require('mongoose');

//define the MongoDB connection URL
//const mongoURL='mongodb://localhost:27017/Hotels';
const mongoURL='mongodb+srv://sankalp_cluster:Sarthak12@sankalpcluster.qs5cpzb.mongodb.net/';
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
