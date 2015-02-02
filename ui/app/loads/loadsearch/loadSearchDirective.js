"use strict"
var app = angular.module("myApp");

app.directive('loadSearchDirective', ['loadService', '$rootScope', 'gunService', 'cartridgeService', 'powderService', function (loadService, $rootScope, gunService, cartridgeService, powderService) {



        return {
            scope: {},
            restrict: 'A',
            templateUrl: '/app/loads/loadsearch/loadSearchDirectiveTemplate.html',
            link: function (scope)
            {
                scope.loadSearch = {};
                scope.loadSearch.powder = {};
                $rootScope.$on(loadService.events.CONFIG_LOADED, function (event, config) {
                    scope.config = config;
                    scope.gunManufacturerList = gunService.manufacturers.get(config);
                    scope.shotgunCartridges = cartridgeService.getShotgunCartridges(config);
                    scope.pistolCartridges = cartridgeService.getPistolCartridges(config);
                    scope.rifleCartridges = cartridgeService.getRifleCartridges(config);
                    //scope.powderManufacturerList = powderService.manufacturers.get(config);
                    scope.shotgunPowderList = powderService.shotgun.get(config);
                    scope.riflePowderList = powderService.rifle.get(config);
                    scope.pistolPowderList = powderService.pistol.get(config);
                    
                });
                loadService.requestConfig();
                
                
                scope.getPowders = function()
                {
                    switch(scope.loadSearch.type)
                    {
                        case "Shotgun" :
                        {
                            return scope.shotgunPowderList;
                        }
                        case "Rifle" : 
                        {
                                return scope.riflePowderList;
                        }
                        case "Pistol" :
                        {
                            return scope.pistolPowderList;
                        }
                    };
                };


            }
        };

    }]);