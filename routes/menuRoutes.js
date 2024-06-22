const express = require('express');
const routes = express.Router();

const MenuItem = require('./../MenuItem');

routes.post('/', async(req, res)=> {
    try{
        const data = req.body;
        const newItem = new MenuItem(data);
        const response = await newItem.save();
        console.log('data saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});

    }
})

// GET methid to get the person
routes.get('/', async(req, res) => {
    try{
        const data=  await MenuItem.find();
        console.log('data fethed');
        res.status(200).json(data);


    }
    catch (err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});

    }
});
routes.get('/:taste', async(req, res) => {
    try{
    const taste = req.params.taste // Extract the work type from the URL parameter
    if(taste =='sweet'||taste =='sour'||taste =='spicy'){
        const data=  await MenuItem.find({taste:taste});
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
routes.put('/:id', async(req, res)=>{
    try{
        const MenuId = req.params.id;//Extract the id from the URL parameter
        const updatedMenudata = req.body;//update data for the person
        const response =  await MenuItem.findByIdAndUpdate(MenuId, updatedMenudata,{
            new: true,// return the updated document
            runValidators: true,//run mongoose validation
        });
        if (!response){
            return res.status(404).json({error: 'Dish not found'});

        }
        console.log('dish updated');
        res.status(200).json(response);


    }catch(err){

        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

routes.delete('/:id', async(req, res)=>{
    try{
        const MenuId = req.params.id;
        //assuming you have a person model
        const response = await MenuItem.findByIdAndDelete(MenuId);
        if (!response){
            return res.status(404).json({error: 'dish not found'});

        }
        console.log('data deleted');
        res.status(200).json({message:'Dish deleted succesfully'}); 
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }

})

module.exports = routes;
