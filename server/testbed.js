var gunModel = require('./guns/gunModel.js');

var powderModel = require('./powders/powderModel.js');

var primerModel = require('./primers/primerModel.js');

var loadModel = require('./loads/loadModel.js');

if(process && process.title &&  process.title.toLowerCase().indexOf('node') > -1)
{
console.log(process.title);
}

/*gunModel.getGunModels().then(function(results){
    console.log(results);
});*/


/*powderModel.getPowders().then(function(results){
    console.log(results);
});*/

//loadModel.getConfig();

/*primerModel.getPrimers().then(function(results){
    console.log(results);
});*/
