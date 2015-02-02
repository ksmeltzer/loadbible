"use strict"
var app = angular.module('myApp');

app.factory('cartridgeService', ['loadService', function (loadService) {
        var cartridgeService = {cartridges: {}};
        
        var getCartridgesByType = function(config, type)
        {
            var typeCartridges = jlinq.from(config.cartridges).contains("types", type).select();
            return typeCartridges;
        };

        cartridgeService.getShotgunCartridges = function (config)
        {
            
             if (config.shotgunCartridges)
            {
                return config.shotgunCartridges;
            }
            else
            {
                config.shotgunCartridges = getCartridgesByType(config, 'Shotgun');
                return config.shotgunCartridges;
            }
            
        };
        
        cartridgeService.getPistolCartridges = function (config)
        {
             if (config.pistolCartridges)
            {
                return config.pistolCartridges;
            }
            else
            {
                config.pistolCartridges = getCartridgesByType(config, 'Pistol');
                return config.pistolCartridges;
            }
        };
        
        cartridgeService.getRifleCartridges = function (config)
        {
             if (config.rifleCartridges)
            {
                return config.rifleCartridges;
            }
            else
            {
                config.rifleCartridges = getCartridgesByType(config, 'Rifle');
                return config.rifleCartridges;
            }
        };

        return cartridgeService;
    }]);

