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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    guns: [{
            manufacturer: {
                type: String
            },
            model: {
                type: String
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            fields: [{
                name: {
                    type: String
                },
                value: {
                    type: String
                }
            }]
        }
        ]
}, schemaOptions);

var User = mongoose.model('users', UserSchema);

UserSchema.virtual('id')
    .get(function () {
        return this._id;
    });


module.exports.UserSchema = UserSchema;
module.exports.User = User;
