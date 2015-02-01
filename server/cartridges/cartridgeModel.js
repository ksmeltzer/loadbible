var db = require('../shared/db.js');
var mongoose = db.getConnection();
var q = require('q');

var CartridgeSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    gunTypes: [{type: String}],
    approved : {type: Boolean, required: true, default: false}
}, db.getSchemaOptions());

CartridgeSchema.virtual('id')
.get(function () {
  return this._id;
});

var CartridgeModel = mongoose.model('cartridges', CartridgeSchema);


module.exports.CartridgeSchema = CartridgeSchema;
module.exports.CartridgeModel = CartridgeModel;



module.exports.getCartridges = function()
{
    var deferred = q.defer();
    CartridgeModel.find({}, function(err, cartridgeList){
        deferred.resolve(cartridgeList);
    });
    return deferred.promise;
};