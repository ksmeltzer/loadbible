var db = require('../shared/db.js');
var mongoose = db.getConnection();
var q = require('q');

var arrayUtil = require('../shared/util/arrayUtil.js');


var GunTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fields: [String]

}, db.getSchemaOptions());

GunTypeSchema.virtual('id')
.get(function () {
  return this._id;
});

var GunType = mongoose.model('gun.types', GunTypeSchema);



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




module.exports.GunTypeSchema = GunTypeSchema;
module.exports.GunType = GunType;
module.exports.GunModelSchema = GunModelSchema;
module.exports.GunModel = GunModel;


module.exports.getGunModels = function()
{
    var deferred = q.defer();
    var listByManufacturer = [];
    GunModel.find({}, function (err, modelList) {
            for(var x = 0; x < modelList.length; x++)
            {
                var tmpModel = modelList[x];
                if(!listByManufacturer[tmpModel.manufacturer])
                {
                    listByManufacturer[tmpModel.manufacturer] = {name: tmpModel.manufacturer, models: [tmpModel]};
                }
                else
                {
                    listByManufacturer[tmpModel.manufacturer].models.push(tmpModel);
                }
            }
            
           
            
            deferred.resolve(arrayUtil.convertAssociativeArrayToNumericArray(listByManufacturer));
            

        });
        return deferred.promise;
};


module.exports.getGunTypes = function () {
    var deferred = q.defer();
    var last = false;
    var gunTypeList = [];

    var getFieldData = function(field)
    {
        var def2 = q.defer();

        var typevaluesFind = q.nfbind(GunTypeCustomField.find.bind(GunTypeCustomField));
        typevaluesFind({fieldName: field.name}).then(function(fieldList){
                field.values = fieldList;
               // for (var i = 0; i < fieldList.length; i++) {
                 //   field.values.push(fieldList[i].value);
                //}
                def2.resolve(field);
            });

        return def2.promise;


    };


    var getFieldsForType = function (gunType) {
        var promiseQueue = [];
        var def2 = q.defer();
        fieldsReturned = 0;
        for (var x = 0; x < gunType.fields.length; x++) {
            var fieldName = gunType.fields[x];
            var tmpfield = gunType.fields[x] = {name : fieldName, values : []};

            promiseQueue.push(getFieldData(tmpfield));
        }

        q.all(promiseQueue).then(function(results)
                                 {
            gunType.fields = results;
            def2.resolve(gunType);
        });
        return def2.promise;

    };


    GunType.find({}, function (err, list) {

        for (var i = 0; i < list.length; i++) {
            var gunType = list[i].toObject();
            gunTypeList.push(gunType);
            var promiseChain = [];
            promiseChain.push(getFieldsForType(gunType));
        }
        q.all(promiseChain).then(function(results){
            console.log(results);
            deferred.resolve(gunTypeList);
        });

    });
    return deferred.promise;
};
