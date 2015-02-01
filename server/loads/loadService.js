var db = require('../shared/db.js');
var mongoose = db.getConnection();


var loadModel = require('./loadModel.js');


module.exports.getConfig = function(req, res)
{
    loadModel.getConfig().then(function(config){
        res.send(config);
    });
};