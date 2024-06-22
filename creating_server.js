const express = require('express')
const app = express();
const db= require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

;

app.get('/', function (req, res) {
    res.send('Welcome to my Chotu Dhaba,we serve best dishes ')
});




/* app.get('/dal',(req,res)=>{
    res.send("sure sir, preparing your dal it gonna take some time ")
})
app.get('/idli',(req,res)=>{
    var customized_idli = {
        name :'rava idli',
        size:'10 cm diameter',
        is_sambhar: true,
        is_chutney:false
    }
    res.send(customized_idli)
})
app.post('/items',(req,res)=>{
    res.send("Data is saved successfully");
}) */


// Import the router files
const personRoutes = require('./routes/personRoute');
//use the routes
app.use('/person',personRoutes);

const MenuItem=require('./routes/menuRoutes');
app.use('/menu',MenuItem);
app.listen(3000,()=>{
    console.log('listening on port 3000')
});