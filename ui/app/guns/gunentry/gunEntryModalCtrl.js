"use strict"

var app = angular.module('myApp');

app.controller('gunEntryModalCtrl', function ($scope, $rootScope, $modalInstance, gunService) {

    $scope.currentSelectedManufacturer = {};
    $scope.currentSelectedManufacturer.models = [];

        $rootScope.$on(gunService.eventNames.GUN_CONFIG_CHANGED, function(event, gunConfigData) {
           $scope.gunConfig = gunConfigData;

            console.log(gunConfigData);
        });


        $scope.editGun = {};
    $scope.editGun.fields = [];

         gunService.requestGunConfig();


        $scope.ok = function () {
            $modalInstance.close($scope.editGun);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.manufacturer_blur = function()
    {

            if($scope.editGun.manufacturer)
            {
                 $scope.currentSelectedManufacturer = {};
                for(var x = 0; x < $scope.gunConfig.manufacturers.length; x++)
                {
                    if($scope.gunConfig.manufacturers[x].name == $scope.editGun.manufacturer)
                    {
                        $scope.currentSelectedManufacturer = $scope.gunConfig.manufacturers[x];
                        break;
                    }
                }
            }
    };

    $scope.model_blur = function()
    {
        if($scope.currentSelectedManufacturer)
            {

                if($scope.editGun.model)
                {
                    for(var x = 0; x < $scope.currentSelectedManufacturer.models.length; x++)
                    {
                        if( $scope.currentSelectedManufacturer.models[x].name == $scope.editGun.model)
                        {
                            $scope.currentSelectedManufacturer.currentlySelectedModel = $scope.currentSelectedManufacturer.models[x];
                            if($scope.currentSelectedManufacturer.currentlySelectedModel.type)
                            {
                                $scope.editGun.type = $scope.currentSelectedManufacturer.currentlySelectedModel.type;

                                for(var i = 0; i < $scope.gunConfig.gunTypes.length; i++)
                                {
                                    var typeConf  = $scope.gunConfig.gunTypes[i];

                                    if(typeConf.name == $scope.editGun.type)
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
    }

    $scope.parseField = function(field, $index, value)
    {
        console.log(field);
        console.log($index);
        console.log(value);

    }

    });
