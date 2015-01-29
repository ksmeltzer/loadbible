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



var GunTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fields: [String]

}, schemaOptions);

GunTypeSchema.virtual('id')
.get(function () {
  return this._id;
});

var GunType = mongoose.model('gun.types', GunTypeSchema);

var GunManufacturerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    models: [GunModel]

}, schemaOptions);

GunManufacturerSchema.virtual('id')
.get(function () {
  return this._id;
});

var GunManufacturer = mongoose.model('gun.manufacturers', GunManufacturerSchema);

var GunModelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String
    },
    manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GunManufacturer'
    }
}, schemaOptions);

GunModelSchema.virtual('id')
.get(function () {
  return this._id;
});

var GunModel = mongoose.model('gun.models', GunModelSchema);

var GunTypeCustomFieldSchema = mongoose.Schema({
    fieldName: {
        type: String
    },
    value: {
        type: String
    }

}, schemaOptions);

GunTypeCustomFieldSchema.virtual('id')
.get(function () {
  return this._id;
});

var GunTypeCustomField = mongoose.model('gun.type.customfields', GunTypeCustomFieldSchema);


module.exports.GunTypeSchema = GunTypeSchema;
module.exports.GunType = GunType;
module.exports.GunModelSchema = GunModelSchema;
module.exports.GunModel = GunModel;
module.exports.GunManufacturerSchema = GunManufacturerSchema;
module.exports.GunManufacturer = GunManufacturer;

module.exports.getManufacturers = function () {
    var deferred = q.defer();
    var last = false;
    var manufacturerList = [];

    var addTypes = function (manufacturer) {
        var def2 = q.defer();
        manufacturer.models = [];
        GunModel.find({
            'manufacturer': manufacturer._id
        }, function (err2, modelList) {
            manufacturer.models = modelList;
            manufacturerList.push(manufacturer);
                def2.resolve(manufacturer);

        });
        return def2.promise;
    }




    GunManufacturer.find({}, function (err, list) {


         var promiseChain = [];
        for (var i = 0; i < list.length; i++) {
            promiseChain.push(addTypes(list[i]));
        }
        q.all(promiseChain).then(function(){deferred.resolve(manufacturerList)});
    });
    return deferred.promise;
}

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


    }


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

    }


    GunType.find({}, function (err, list) {

        for (var i = 0; i < list.length; i++) {
            var gunType = list[i].toObject();
            gunTypeList.push(gunType);
            var promiseChain = [];
            promiseChain.push(getFieldsForType(gunType));
        }
        q.all(promiseChain).then(function(results){
            console.log(results);
            deferred.resolve(gunTypeList)
        });

    });
    return deferred.promise;
}
