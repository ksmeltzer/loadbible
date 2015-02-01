"use strict"
var app = angular.module('myApp');

app.factory('cartridgeService', ['loadService', function (loadService) {
        var cartridgeService = {cartridges: {}};

        cartridgeService.getShotgunCartridges = function ()
        {
            var config = loadService.config;

            if (config.shotgunCartridges)
            {
                return config.shotgunCartridges;
            }

            var shotgunCartridges = jlinq.from(config.cartridges).contains("gunTypes", "Shotgun").select();

            config.shotgunCartridges = shotgunCartridges;
            return shotgunCartridges;
        };
        return cartridgeService;
    }]);