const express = require('express');
const router =express.Router();

const Person = require('./../person');

//post route to add a person
router.post('/', async(req, res)=> {
    try{
        const data = req.body;
        const newPerson = new Person(data);
         const response = await newPerson.save();
         console.log('data saved');
         res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});

    }
})

// GET methid to get the person
router.get('/', async(req, res) => {
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
