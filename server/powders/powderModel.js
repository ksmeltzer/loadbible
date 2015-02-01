var db = require('../shared/db.js');
var mongoose = db.getConnection();
var q = require('q');

var arrayUtil = require('../shared/util/arrayUtil.js');


 var PowderSchema = mongoose.Schema({
      manufacturer : {type: String, required: true},
      name : {type: String, required: true},
      type : [String] //[Shotgun, Rifle, Pistol]
     }, db.getSchemaOptions());

PowderSchema.virtual('id')
.get(function () {
  return this._id;
});

var Powder = mongoose.model('powders', PowderSchema);


module.exports.PowderSchema = PowderSchema;
module.exports.Powder = Powder;


module.exports.getPowders = function()
{
  var deferred = q.defer();
  var manufacturerSortedList = [];
  Powder.find({}, function(err, powderList){
     
      deferred.resolve(powderList);
      
      
  });
  return deferred.promise;
};