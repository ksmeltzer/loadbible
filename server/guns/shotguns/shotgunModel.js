var db = require('../shared/db.js');
var mongoose = db.getConnection();
var q = require('q');


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
modules.exports.Hull = Hull;