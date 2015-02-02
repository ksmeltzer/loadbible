var db = require('../shared/db.js');
var mongoose = db.getConnection();
var q = require('q');

var arrayUtil = require('../shared/util/arrayUtil.js');


var GunModelSchema = mongoose.Schema({
    manufacturer : {type: String, required: true},
    name: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    approved : {type: Boolean, required: true, default: false}
}, db.getSchemaOptions());

GunModelSchema.virtual('id')
.get(function () {
  return this._id;
});

var GunModel = mongoose.model('gun.models', GunModelSchema);


module.exports.GunModelSchema = GunModelSchema;
module.exports.GunModel = GunModel;


module.exports.getGunModels = function()
{
    var deferred = q.defer();
    GunModel.find({}, function (err, modelList) {
          
            
            deferred.resolve(modelList);
            

        });
        return deferred.promise;
};


module.exports.getTwistRates = function()
{
    var deferred = q.defer();
    var rates = [];
    for(var x = 7; x < 39; x++)
    {
        if(x > 0)
        {
            var tmpRate = "1 in " + x;
            rates.push(tmpRate);
            rates.push(tmpRate + ".25");
            rates.push(tmpRate + ".50");
            rates.push(tmpRate + ".75");
        }
    }
    deferred.resolve(rates);
    return deferred.promise;
};

module.exports.getBarrelLengths = function()
{
    var deferred = q.defer();
  var lengths = [];
  for(var x = 0; x < 40; x++)
  {
      if(x > 0)
      {
          lengths.push(x);
      }
  }
  
  deferred.resolve(lengths);
  
  return deferred.promise;
};


module.exports.getGunTypes = function()
{
    var deferred = q.defer();
    deferred.resolve(["Rifle", "Pistol", "Shotgun"]);
    return deferred.promise;
};
