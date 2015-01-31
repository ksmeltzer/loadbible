var mongoose = require('../shared/db.js').getConnection();
var q = require('q');



var schemaOptions = {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
};

var UserSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String,required: true},
    email: {type: String, required: true, unique: true},
    hash: {type: String,required: true},
    salt: {type: String, required: true},
    guns: [{
            model: {type: mongoose.Schema.Types.ObjectId, ref: 'gun.models'},
            cartridgeSize : {type: String, required: true},
            barrelLength : {type: String},
            //shotgun specific fields
            choke: {type: String},
            chamberLength: {type: Number},
            //Rifle and Pistol Specific fields
            twistRate: {type: String}
            
        }]
}, schemaOptions);

var User = mongoose.model('users', UserSchema);

UserSchema.virtual('id')
    .get(function () {
        return this._id;
    });


module.exports.UserSchema = UserSchema;
module.exports.User = User;
