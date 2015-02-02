"use strict"
var app = angular.module('myApp');
app.factory('powderService', [function () {
        var powderService = {manufacturers: {}, shotgun : {}, rifle : {}, pistol : {}};

        powderService.manufacturers.get = function (config)
        {
            if (config.powderManufacturers)
            {
                return config.powderManufacturers;
            }
            else
            {

            }

            var manufacturerArray = jlinq.from(config.powders).distinct('manufacturer');

            for (var x = 0; x < manufacturerArray.length; x++)
            {

                var powders = jlinq.from(config.powders).equals("manufacturer", manufacturerArray[x]).select();
                manufacturerArray[x] = {name: manufacturerArray[x], powders: powders};
            }

            config.powderManufacturers = manufacturerArray;
            return manufacturerArray;
        };
        
        powderService.shotgun.get = function(config)
        {
            
           return powderService.getPowdersForType(config, "Shotgun");
            
        };
        
         powderService.rifle.get = function(config)
        {
            
            return powderService.getPowdersForType(config, "Rifle");
            
        };
        
        powderService.pistol.get = function(config)
        {
            
            return powderService.getPowdersForType(config, "Pistol");
            
        };
        
        
        powderService.getPowdersForType = function(config, type){
            
            var typePowders = jlinq.from(config.powders).contains("types", type).select();
            
            var manufacturerArray = jlinq.from(typePowders).distinct('manufacturer');
             for (var x = 0; x < manufacturerArray.length; x++)
            {
                var powders = jlinq.from(typePowders).equals("manufacturer", manufacturerArray[x]).select();
                manufacturerArray[x] = {name: manufacturerArray[x], powders: powders};
            }
            return manufacturerArray;
        };
        


        return powderService;
    }]);

