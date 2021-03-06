"use strict"
var app = angular.module('myApp');

app.factory('gunService', ['$rootScope', '$http', 'userService', 'loadService', function ($rootScope, $http, userService, loadService)
    {

        var gunConfig = null;


        var service = {
            shotgun: {hulls: {}}
        };


        service.eventNames = {};


        service.endpoints = {};
        service.endpoints.GUN_TYPES = "/api/guns/types/";

        service.manufacturers = {};

        service.type = {};


        service.type.save = function (gunType)
        {
            if (gunType._id)
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

        service.manufacturers.get = function (config)
        {
            if (config.gunManufacturers)
            {
                return config.gunManufacturers;
            }

            var manufacturerArray = jlinq.from(config.gunModels).distinct('manufacturer');

            for (var x = 0; x < manufacturerArray.length; x++)
            {

                var models = jlinq.from(config.gunModels).equals("manufacturer", manufacturerArray[x]).select();
                manufacturerArray[x] = {name: manufacturerArray[x], models: models};
            }

            config.gunManufacturers = manufacturerArray;
            return manufacturerArray;
        };


        service.shotgun.hulls.get = function (config)
        {
            if (config.hullSortedByManufacturer)
            {
                return config.hullSortedByManufacturer;
            }

            var manufacturerArray = jlinq.from(config.hulls).distinct('manufacturer');

            for (var x = 0; x < manufacturerArray.length; x++)
            {

                var hulls = jlinq.from(config.hulls).equals("manufacturer", manufacturerArray[x]).select();
                manufacturerArray[x] = {name: manufacturerArray[x], hulls: hulls};
            }

            config.hullSortedByManufacturer = manufacturerArray;
            return manufacturerArray;
        };

        service.shotgun.hulls.getByGauge = function (gauge, config)
        {
            if(config.hullSortedByGuage && config.hullSortedByGuage[gauge])
            {
                return config.hullSortedByGuage[gauge];
            }
            console.log(gauge);
            var hullsbyGuage = jlinq.from(config.hulls).equals("cartridgeSize", gauge).select();

            console.log(hullsbyGuage);
            var manufacturerArray = jlinq.from(hullsbyGuage).distinct('manufacturer');

            for (var x = 0; x < manufacturerArray.length; x++)
            {

                var hulls = jlinq.from(hullsbyGuage).equals("manufacturer", manufacturerArray[x]).select();
                manufacturerArray[x] = {name: manufacturerArray[x], hulls: hulls};
            }

            if(!config.hullSortedByGuage)
            {
                config.hullSortedByGuage = [];
            }

            console.log(manufacturerArray);
            config.hullSortedByGuage[gauge] = manufacturerArray;

            return manufacturerArray;

        };







        return service;
    }]);
