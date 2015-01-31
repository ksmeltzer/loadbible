var db = require('../../shared/db.js');
var mongoose = db.getConnection();
var q = require('q');

var arrayUtil = require('../../shared/util/arrayUtil.js');


  var WadSchema = mongoose.Schema({
      manufacturer : {type: String, required: true},
      name : {type: String, required: true},
      cartridgeSize: {type: String, required: true},
      description: {type: String},
      shotWeight : {type: Number, required: true},
      color: {type: String},
      chamberLength : {type: Number},
      approved : {type: Boolean}
     }, db.getSchemaOptions());

WadSchema.virtual('id')
.get(function () {
  return this._id;
});

var Wad = mongoose.model('gun.shotgun.wads', WadSchema);





var HullSchema = mongoose.Schema({
     manufacturer : {type: String, required: true},
      name : {type: String, required: true},
      cartridgeSize: {type: String, required: true},
      chamberLength : {type: Number, required: true},
       description: {type: String},
      approved : {type: Boolean}
}, db.getSchemaOptions());


HullSchema.virtual('id')
.get(function () {
  return this._id;
});

var Hull = mongoose.model('gun.shotgun.hulls', HullSchema);


module.exports.WadSchema = WadSchema;
module.exports.Wad = Wad;

module.exports.HullScheme = HullSchema;
module.exports.Hull = Hull;


module.exports.getHulls = function()
{
    var deferred = q.defer();
    var hullsSortedByManufacturer = [];
    Hull.find({}, function(err, hullList){
        for(var x = 0; x < hullList.length; x++)
        {
            var tmpHull = hullList[x];
            if(!hullsSortedByManufacturer[tmpHull.manufacturer])
            {
                hullsSortedByManufacturer[tmpHull.manufacturer] = {name : tmpHull.manufacturer, hulls: [tmpHull]};
            }
            else
            {
                hullsSortedByManufacturer[tmpHull.manufacturer].push(tmpHull);
            }
            
            deferred.resolve(arrayUtil.convertAssociativeArrayToNumericArray(hullsSortedByManufacturer));
        }
    });
    return deferred.promise;
};

module.exports.getWads = function()
{
    var deferred = q.defer();
    var wadsSortedByManufacturer = [];
    Wad.find({}, function(err, wadList){
        for(var x = 0; x < wadList.length; x++)
        {
            var tmpWad = wadList[x];
            if(!wadsSortedByManufacturer[tmpWad.manufacturer])
            {
                 wadsSortedByManufacturer[tmpWad.manufacturer] = {name: tmpWad.manufacturer, wads: [tmpWad]};
            }
            else
            {
                wadsSortedByManufacturer[tmpWad.manufacturer].wads.push(tmpWad);
            }
        }
        deferred.resolve(arrayUtil.convertAssociativeArrayToNumericArray(wadsSortedByManufacturer));
    });
    return deferred.promise;
};