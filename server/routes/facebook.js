const express = require('express')
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user')
const { getPages ,getInfoUser } = require('../lib/facebook')

const app = express.Router()

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.use(new FacebookStrategy({
    clientID: '1764836870198489',
    clientSecret: 'b07f07575b408b0cf31fcd8a81b7ee52',
    callbackURL: "https://6c187794.ngrok.io/auth/facebook/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
      var user = await User.findOne({
        'facebook.id' : profile.id
      })
           var accessTokenTest = "EAAAAUaZA8jlABALapqnn9BBymfm78L1lQhMcUnwAXO6PRWZA6zgwH6DlO4biXXNWkLwSaIBSRQJnvu6wOlRFHcZBLAmQQulVXuh94PfJBMcCk4CTAOVa8ZA9op6g60YaBLL9gPiCB8yXkPRldYXAmTHCt9HVTKvcVo1zBBIg08GZAzoA9M475"

        var pages = await getPages(accessTokenTest)
        var info = await getInfoUser(profile.id,accessTokenTest)
          if(user){
              user.facebook  =  {
                id : profile.id,
                email : profile.email,
                name : profile.displayName,
                picture : info.picture,
                accessToken : accessToken,
                pages : pages
              }
              user.save()
              done(null,user)
          }else{
            var user = new User({
              facebook : {
                id : profile.id,
                email : profile.email,
                name : profile.displayName,
                picture : info.picture,
                accessToken : accessToken,
                pages : pages
              }
            })
            user.save()
            done(null,user)
          }
      
  }
));


app.get('/login', passport.authenticate('facebook',{scope: ['public_profile','email','user_link']}));

app.get('/callback',
  passport.authenticate('facebook', { successRedirect: '/143980042982450/dashboard',
                                      failureRedirect: '/login' }));


module.exports = app