//Sets up Passport with a local authentication strategy ,using a person model for use
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./person'); //adjsut the path as needed

passport.use(new LocalStrategy(async(USERNAME, password, done)=>{
    //authentication logic 
    try {
        //console.log('Received credentials',USERNAME ,password);
        const user= await Person.findOne({username:USERNAME});
        if(!user)
            return done(null, false, {message:'User not found'});
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch){
            return done(null, user);
        }else{
            return done(null, false, {message:'Incorrect password'});
        }

    }catch(err){
        return done(err);

    }
}));

module.exports =passport;