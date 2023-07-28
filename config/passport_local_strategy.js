const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');
const e = require('express');

passport.use(new LocalStrategy({ usernameField:'email' },
    async (email,password,done)=>{
        await User.findOne({email:email})
        .then((user)=>{
            if(!user || user.password!=password){
                console.log('Invalid username/password');
                return done(null,false);
            }
            else {
                return done(null,user);
            }
        })
        .catch((err)=>{
            if(err){
                console.log('Error in finding user-->passport');
                return done(err);
            }
        })
    } 
));

//Seriallizing the user to decide which key is to kept in the cookies
passport.serializeUser(async (user,done)=>{
    await done(null,user.id);
})

//deserializing the user from the key in the cookies
passport.deserializeUser(async (id,done)=>{
    await User.findById(id)
    .then((user)=>{
        return done(null,user);
    })
    .catch((err)=>{
        console.log('Error in finding user-->passport');
        return done(err);
    })
});

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()) return next();
    return res.redirect('/api/v1/users/signIn');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        console.log(req);
        res.locals.user=req.user;
    } 
    next();
}

module.exports=passport;