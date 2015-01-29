// Load required packages
var passport = require('passport');
var TokenStrategy = require('passport-token').Strategy;
var uuid = require('node-uuid');
var forge = require('node-forge');
var userModel = require('./userModel.js');


passport.use(new TokenStrategy(
  function(username, token, callback) {
      console.log(username);
   userModel.User.findOne({ email: username }, function (err, user) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false); }


      // Make sure the password is correct
       var md = forge.md.sha512.create();
       md.update(token + user.salt);
       var hashToCheck = md.digest().toHex();
       if(hashToCheck == user.hash)
       {
            return callback(null, user);
       }
       else
       {
           return callback(null, false);
       }
    });
  }
));

exports.isAuthenticated = passport.authenticate('token', { session : false });

exports.hashUserPassword = function(user)
{
    var hash = user.clientHash;

    user.salt =  uuid.v4();

      var md = forge.md.sha512.create();
    md.update(hash + user.salt);
    user.hash = md.digest().toHex();
    delete  user.clientHash;
}
