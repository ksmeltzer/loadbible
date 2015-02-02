"use strict"

var app = angular.module('myApp');

app.controller('gunEntryModalCtrl', function ($scope, $rootScope, $modalInstance, gunService, loadService, cartridgeService) {

    $scope.currentSelectedManufacturer = {};
    $scope.currentSelectedManufacturer.models = [];

    $rootScope.$on(loadService.events.CONFIG_LOADED, function(event, config){
        scope.config = config;
        $scope.gunManufacturerList = gunService.manufacturers.get(config);
        $scope.shotgunCartridges = cartridgeService.getShotgunCartridges(config);
        $scope.pistolCartridges = cartridgeService.getPistolCartridges(config);
        $scope.rifleCartridges = cartridgeService.getRifleCartridges(config);
     });
     loadService.requestConfig();

    
   
    
    $scope.config = config;
    $scope.gunManufacturerList = gunManufacturerList;
    $scope.shotgunCartridges = shotgunCartridges;
    $scope.pistolCartridges = pistolCartridges;
    $scope.rifleCartridges = rifleCartridges;
    
    

    $scope.editGun = {};
    $scope.editGun.fields = [];

    $scope.ok = function () {
        $modalInstance.close($scope.editGun);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.manufacturer_blur = function ()
    {

        if ($scope.editGun.manufacturer)
        {
            $scope.currentSelectedManufacturer = {};
            for (var x = 0; x < gunManufacturerList.length; x++)
            {
                if (gunManufacturerList[x].name == $scope.editGun.manufacturer)
                {
                    $scope.currentSelectedManufacturer = gunManufacturerList[x];
                    break;
                }
            }
        }
    };

    $scope.model_blur = function ()
    {
        if ($scope.currentSelectedManufacturer)
        {

            if ($scope.editGun.model)
            {
                for (var x = 0; x < $scope.currentSelectedManufacturer.models.length; x++)
                {
                    if ($scope.currentSelectedManufacturer.models[x].name == $scope.editGun.model)
                    {
                        $scope.currentSelectedManufacturer.currentlySelectedModel = $scope.currentSelectedManufacturer.models[x];
                        if ($scope.currentSelectedManufacturer.currentlySelectedModel.type)
                        {
                            $scope.editGun.type = $scope.currentSelectedManufacturer.currentlySelectedModel.type;

                            for (var i = 0; i < config.gunTypes.length; i++)
                            {
                                var typeConf = config.gunTypes[i];

                                if (typeConf.name == $scope.editGun.type)
                                {
                                    $scope.currentSelectedType = typeConf;
                                    break;
                                }
                            }

                            break;
                        }
                    }
                }
            }
        }
    };

});
