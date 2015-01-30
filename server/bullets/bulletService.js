var db = require('../shared/db.js');
var q = require('q');

var bulletModel = require('./bulletModel.js');


var mongoose = db.getConnection();


module.exports.postOrPutBullet(req, res)
{
    var bullet = new bulletModel.Bullet(req.body);
    
    bullet.save();
    
    res.send(bullet.toObject());
}

