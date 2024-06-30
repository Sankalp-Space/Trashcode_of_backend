const express = require('express');
const router =express.Router();

const Person = require('./../person');

const {jwtAuthMiddleware,generateToken}=require('./../jwt');


//post route to add a person
router.post('/signup', async(req, res)=> {
    try{
        const data = req.body;
        const newPerson = new Person(data);
         const response = await newPerson.save();
         console.log('data saved');

         const payload={
            id: response.id,
            username: response.username,
            

         }
         console.log(JSON.stringify(payload));
         const token = generateToken(payload);
         console.log("Token is : ", token);
         res.status(200).json({response:response,token:token});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});

    }
})

//Login Route
router.post('/login',async (req, res) => {
    try{
        //Extract username and passsword from request body
        const {username,password} = req.body;

        //Find ther user by username
        const user = await Person.findOne({username: username});
        // If user does not exist or password does not match
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //generate Token 
        const payload={
            id: user.id,
            username: user.username

    }
    const token = generateToken(payload);

    //return Response
    res.json({token});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }

});

//Profile route
router.get('/profile',jwtAuthMiddleware,async (req, res) => { 
    try{
        const userData=req.user;
        console.log("User data:",userData);
        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(200).json({user});


    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});

    }

});


// GET methid to get the person
router.get('/',jwtAuthMiddleware, async(req, res) => {
    try{
        const data=  await Person.find();
        console.log('data fethed');
        res.status(200).json(data);


    }
    catch (err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});

    }
})
router.get('/:workType', async(req, res) => {
    try{
    const workType = req.params.workType // Extract the work type from the URL parameter
    if(workType =='chef'||workType =='manager'||workType =='waiter'){
        const data=  await Person.find({work:workType});
        console.log('data fethed');
        res.status(200).json(data);
    }
    else{
        res.status(400).json({error: 'Invalid work type'});
    }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.put('/:id', async(req, res)=>{
    try{
        const personId = req.params.id;//Extract the id from the URL parameter
        const updatedPersondata = req.body;//update data for the person
        const response =  await Person.findByIdAndUpdate(personId, updatedPersondata,{
            new: true,// return the updated document
            runValidators: true,//run mongoose validation
        });
        if (!response){
            return res.status(404).json({error: 'Person not found'});

        }
        console.log('data updated');
        res.status(200).json(response);


    }catch(err){

        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.delete('/:id', async(req, res)=>{
    try{
        const personId = req.params.id;
        //assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);
        if (!response){
            return res.status(404).json({error: 'Person not found'});

        }
        console.log('data deleted');
        res.status(200).json({message:'Person deleted succesfully'}); 
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }

})

module.exports =router;
