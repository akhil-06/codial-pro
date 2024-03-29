const passport = require('passport');
// one const for importing and 2nd one for extrating JWT from header 
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
const env = require('./environment');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:env.jwt_secret
}

passport.use(new JWTstrategy(opts, function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id, function(err,user){
        if(err){
            console.log('Error in finding the user from JWT');
        }
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));


module.exports = passport;