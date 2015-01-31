var db = require('../shared/db.js');
var mongoose = db.getConnection();
var q = require('q');


 var LoadSchema = mongoose.Schema({
    type: {type: String, required: true},
    cartridgeSize: '12 Gauge',
    powder: {}, //Object,
    charge: {type: Number, required: true},
    primer: {}, //Object,
    velocity: {type: Number},
    pressure: {type: String},
    crimp : {type: String},
    //Shotgun Specific fields
    shotWeight: {type: Number},
    hull: {}, //Object
    wad: {}, //Object
    chamberLength: {type: Number},
    //Pistol and Rifle Specific fields
    bullet: {} // Object

}, db.getSchemaOptions());

LoadSchema.virtual('id')
.get(function () {
  return this._id;
});