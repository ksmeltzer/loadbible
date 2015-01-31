var db = require('../shared/db.js');
var mongoose = db.getConnection();
var q = require('q');

  
  var BulletSchema = mongoose.Schema({
      cartridgeSize : {type : String, required : true},
      manufacturer : {type : String},
      diameter : {type : Number, required : true},
      grain : {type : Number, reqired : true},
      type : {type: String},
      sectionalDensity : {type : Number},
      ballisticCoefficient : {type : Number},
      length : {type : Number},
      coating : {type : String},
      material : {type: String},
      approved : {type: Boolean}
     }, db.getSchemaOptions());

bulletSchema.virtual('id')
.get(function () {
  return this._id;
});

var Bullet = mongoose.model('bullets', BulletSchema);


module.exports.BulletSchema = BulletSchema;
module.exports.Bullet = Bullet;


module.exports.getBullets = function()
{
    var deferred = q.defer();
    Bullet.find({}, function(err, bulletList){
        deferred.resolve(bulletList);
    });
    
    return deferred.promise;
}