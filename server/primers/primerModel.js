var db = require('../shared/db.js');
var mongoose = db.getConnection();
var q = require('q');

var arrayUtil = require('../shared/util/arrayUtil.js');

var PrimerSchema = mongoose.Schema({
            manufacturer : {type: String, required: true},
            name:  {type: String, required: true},
            type: {type: String, required: true},
            boxer: {type: Boolean}
        }, db.getSchemaOptions());
        
        
 PrimerSchema.virtual('id')
    .get(function () {
    return this._id;
});

var Primer = mongoose.model('primers', PrimerSchema);

module.exports.PrimerSchema = PrimerSchema;
module.exports.Primer = Primer;


module.exports.getPrimers = function()
{
    var deferred = q.defer();
    var primersSortedByManufacturer = [];
    Primer.find({}, function(err, primerList){
        
        
        deferred.resolve(primerList);
    });
    return deferred.promise;
};
