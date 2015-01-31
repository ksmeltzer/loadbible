var mongoose = require('mongoose');
var collectionNames = [];

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
    mongoose.connection.db.collectionNames(function (err, names) {
        for(var x = 0; x < names.length; x++)
        {
            if(names[x].name.indexOf('.system.') == -1) //filter out system tables
            {
            collectionNames[names[x].name] = names[x].name
            }
        }
        //console.log(collectionNames); // [{ name: 'dbname.myCollection' }]
    });
})

mongoose.connect('mongodb://localhost/reloader');



exports.getConnection = function()
{
    return mongoose;
}

exports.getCollectionNames = function()
{
    return collectionNames;
}

exports.getSchemaOptions = function()
{
      return {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
  };
}
