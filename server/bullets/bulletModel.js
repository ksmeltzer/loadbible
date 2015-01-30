var mongoose = require('../shared/db.js').getConnection();
var q = require('q');

  var schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
  };
  
  
  var BulletSchema = mongoose.model({
      catridgeSize : {type : String, required : true},
      manufacturer : {type : String},
      diameter : {type : Number, required : true},
      grain : {type : number, reqired : true},
      type : {type: String},
      sectionalDensity : {type : Number},
      ballisticCoefficient : {type : Number},
      length : {type : Number},
      coating : {type : String},
      material : {type: String},
      approved : {type: Boolean}
     }, schemaOptions);

bulletSchema.virtual('id')
.get(function () {
  return this._id;
});

var Bullet = mongoose.model('bullets', BulletSchema);


module.exports.BulletSchema = BulletSchema;

