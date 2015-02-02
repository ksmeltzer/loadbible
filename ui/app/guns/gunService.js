"use strict"
var app = angular.module('myApp');

app.factory('gunService', ['$rootScope', '$http', 'userService', 'loadService', function($rootScope, $http, userService, loadService)
{

    var gunConfig = null;


    var service = {
    };


    service.eventNames = {};
    

    service.endpoints = {};
    service.endpoints.GUN_TYPES = "/api/guns/types/";
    
    service.manufacturers = {};
    
    service.type = {};


    service.type.save = function(gunType)
    {
        if(gunType._id)
        {
            //we need to update
        }
        else
        {
            $http.post(service.endpoints.GUN_TYPES, gunType).
            success(function (data, status, headers, config) {
                console.log("gun saved");
            }).
            error(function (data, status, headers, config) {
                console.log("error: ");
                console.log(data);
            });

        }
    };
    
    service.manufacturers.get = function(config)
    { 
      if(config.gunManufacturers)
      {
          return config.gunManufacturers;
      }
      
      var manufacturerArray = jlinq.from(config.gunModels).distinct('manufacturer');
      
      for(var x = 0; x < manufacturerArray.length; x++)
      {
          
          var models = jlinq.from(config.gunModels).equals("manufacturer", manufacturerArray[x]).select();
          manufacturerArray[x] = {name : manufacturerArray[x], models: models};
      }
      
      config.gunManufacturers = manufacturerArray;
      return manufacturerArray;
    };


   



    return service;
}]);
