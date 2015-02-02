"use strict"
var app = angular.module('myApp');

app.factory('cartridgeService', ['loadService', function (loadService) {
        var cartridgeService = {cartridges: {}};
        
        var getCartridgesByType = function(type)
        {
            var config = loadService.config;

            var typeCartridges = jlinq.from(config.cartridges).contains("gunTypes", type).select();
            return typeCartridges;
        };

        cartridgeService.getShotgunCartridges = function ()
        {
            var config = loadService.config;
            
             if (config.shotgunCartridges)
            {
                return config.shotgunCartridges;
            }
            else
            {
                config.shotgunCartridges = getCartridgesByType('Shotgun');
                return config.shotgunCartridges;
            }
            
        };
        
        cartridgeService.getPistolCartridges = function ()
        {
            var config = loadService.config;
             if (config.pistolCartridges)
            {
                return config.pistolCartridges;
            }
            else
            {
                config.pistolCartridges = getCartridgesByType('Pistol');
                return config.pistolCartridges;
            }
        };
        
        cartridgeService.getRifleCartridges = function ()
        {
            var config = loadService.config;
             if (config.rifleCartridges)
            {
                return config.rifleCartridges;
            }
            else
            {
                config.rifleCartridges = getCartridgesByType('Rifle');
                return config.rifleCartridges;
            }
        };
        
        
        
        
        return cartridgeService;
    }]);

