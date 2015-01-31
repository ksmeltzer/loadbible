var db = require('../shared/db.js');
var mongoose = db.getConnection();
var q = require('q');

var powderModel = require('../powders/powderModel.js');
var primerModel = require('../primers/primerModel.js');
var shotgunModel = require('../guns/shotguns/shotgunModel.js');



 var LoadSchema = mongoose.Schema({
    type: {type: String, required: true},
    cartridgeSize: {type: String},
    powder: {type: mongoose.Schema.Types.ObjectId, ref: 'powders'},
    charge: {type: Number, required: true},
    primer: {type: mongoose.Schema.Types.ObjectId, ref: 'primers'},
    velocity: {type: Number},
    pressure: {type: String},
    crimp : {type: String},
    //Shotgun Specific fields
    shotWeight: {type: Number},
    hull: {type: mongoose.Schema.Types.ObjectId, ref: 'gun.shotgun.hulls'},
    wad: {type: mongoose.Schema.Types.ObjectId, ref: 'gun.shotgun.wads'},
    chamberLength: {type: Number},
    //Pistol and Rifle Specific fields
    bullet: {type: mongoose.Schema.Types.ObjectId, ref: 'bullets'}

}, db.getSchemaOptions());

LoadSchema.virtual('id')
.get(function () {
  return this._id;
});



var Load = mongoose.model('loads', LoadSchema);


module.exports.LoadSchema = LoadSchema;
module.exports.Load = Load;



module.exports.getConfig = function()
{
    
   q.all([powderModel.getPowders(), primerModel.getPrimers(), shotgunModel.getHulls(), shotgunModel.getWads()]).then(function(a){

         console.log({powders : a[0], primers : a[1], hulls: a[2], wads: a[3]});
    });  
};
