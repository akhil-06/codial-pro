const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback: true
},
    (req,email,password,done)=>{
        //finding user if present in db,comparing with email
        User.findOne({email:email},(err,user)=>{
            if(err){
                req.flash('error', err);
                // console.log(`error in finding user`); 
                return done(null);}
            // user not found or password incorrect
            if(!user || user.password != password){
                req.flash('error', 'Invalid Usernam/Password');
                // console.log(`passowrd missmatch or invalid user`)
                return done(null,false);
            }
            //user matched
            return done(null,user);
        })
    }

));

// serializing user

passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

//deserializing user

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){console.log(`user is not found`); return done(err);}

        return done(null,user);
    })
});

// check if the user is authenticated

passport.checkAuthentication = (req,res,next)=>{
    //if the user is signed in then let him view the ejs 
    if (req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

//setting user 
passport.setAuthenticatedUser = (req,res,next)=>{
    if (req.isAuthenticated()){
        res.locals.user = req.user
    }
    next();
}




module.exports = passport;