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
       
            deferred.resolve(hullList);
    });
    return deferred.promise;
};

module.exports.getWads = function()
{
    var deferred = q.defer();
    var wadsSortedByManufacturer = [];
    Wad.find({}, function(err, wadList){
       
        deferred.resolve(wadList);
    });
    return deferred.promise;
};

module.exports.getChokes = function()
{
    var deferred = q.defer();
    var chokes = ['Cylinder', 'Skeet 1', 'Improved', 'Light Modified', 'Modified', 'Improved Modified', 'Full', 'Extra Full', 'Turkey', 'Rifled'];
    deferred.resolve(chokes);
    return deferred.promise;
};

module.exports.getChamberLengths = function()
{
    var deferred = q.defer();
    var chamberLengths = [2, 2.5, 2.75, 3, 3.5];
    deferred.resolve(chamberLengths);
    return deferred.promise;
};


module.exports.getShot = function()
{
     var deferred = q.defer();
    var shotSizes = [
       "#TriBall Buck",
       "#0000 Buck",
       "#000 Buck",
       "#00 Buck",
       "#0 Buck",
       "#1 Buck",
       "#2 Buck",
       "#3 Buck",
       "#4 Buck",
       "#FF",
       "#F",
       "#TT",
       "#T",
       "#BBB",
       "#BB",
       "#B",
       "#2",
       "#4",
       "#5",
       "#6",
       "#7.5",
       "#8",
       "#8.5",
       "#9",
       "#12"
   ];
   
   var shotMaterials = ['Lead', 'Steel', 'Hevi-Shot', 'Bismuth'];
   
   deferred.resolve({sizes : shotSizes, materials : shotMaterials});
   
   return deferred.promise;
   
   
};