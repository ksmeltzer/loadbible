var mongoose = require('../shared/db.js').getConnection();

var auth = require('./authentication.js');
var userModel = require('./userModel.js');

    module.exports.getCurrentUserGuns = function (req, res) {

        res.send({
            manufacturer: [
                {
                    name: "browning",
                    models: ['gold', 'A5']
             },
                {
                    name: "remington",
                    models: ['700']
             }
         ],
            types: ['rifle', 'shotgun', 'pistol'],
            calibers: ['22LR, 10GA'],
            twist: ["1 in 9"],
            chamber: ['3 inch', '3.5 inch'],
            length: ['24 inch', '32 inch']
        });

    };

    module.exports.postCurrentUserGuns = function (req, res) {

        console.log(req.user);
        console.log(req.body);

    };

     module.exports.putCurrentUserGuns = function (req, res) {


    };



    module.exports.getUser = function(req, res) {

    }

     module.exports.postUser = function(req, res)
    {
         var user = req.body;
         auth.hashUserPassword(user);
         var createdUser = new userModel.User(user);
         createdUser.save();
         user = createdUser.toObject();
         delete user.hash;
         delete user.salt;
         res.send(user);
    }

    module.exports.putUser = function(req, res)
    {

    }

    module.exports.getAuthentication = function(req, res)
    {
        res.send("");
    }

