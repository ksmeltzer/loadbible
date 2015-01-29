"use strict"
var app = angular.module('myApp');

app.factory('gunService', ['$rootScope', '$http', 'userService', function($rootScope, $http, userService)
{

    var gunConfig = null;


    var service = {
    };


    service.eventNames = {};
    service.eventNames.GUN_CONFIG_CHANGED = "gunService.GUN_CONFIG_CHANGED";
    service.eventNames.GUN_TYPES_LOADED = "gunService.GUN_TYPES_LOADED"

    service.endpoints = {};
    service.endpoints.GUN_CONFIG = '/api/guns/config';
    service.endpoints.GUN_TYPES = "/api/guns/types/";

    service.type = {};

    service.type.requestList = function()
    {
        $http.get(service.endpoints.GUN_TYPES).
            success(function (data, status, headers, config) {
            console.log('farting');
            $rootScope.$emit(service.eventNames.GUN_TYPES_LOADED, data);
                console.log(data);
            }).
            error(function (data, status, headers, config) {
                console.log("error: ");
                console.log(data);
            });
    }

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
    }


    service.requestGunConfig = function()
    {
        if(!gunConfig)
        {
        $http.get(service.endpoints.GUN_CONFIG).
            success(function(data, status, headers, config)
            {
            gunConfig = data;
                $rootScope.$emit(service.eventNames.GUN_CONFIG_CHANGED, gunConfig);
            }).
            error(function(data, status, headers, config)
            {
            });
        }
        else
        {
            $rootScope.$emit(service.eventNames.GUN_CONFIG_CHANGED, gunConfig);
        }
    }



    return service;
}]);
