var db = require('../shared/db.js');
var q = require('q');

var gunModels = require('./gunModel.js');


var mongoose = db.getConnection();

var customTypeFieldModels = [];


exports.getConfig = function (req, res) {


    q.all([gunModels.getGunModels(), gunModels.getGunTypes()]).then(function(a){

         res.send({manufacturers : a[0], gunTypes : a[1]});
    });




};

