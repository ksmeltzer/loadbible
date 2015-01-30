"use strict"

var app = angular.module('myApp');

app.factory('bulletService', ['$modal', '$http', function($modal, $http){

    var service = {};
    
    service.endpoints = {};
    
    service.endpoints.BULLET = '/api/bullets/bullet/';

    service.showAddEditBulletModal = function()
    {
         var modalInstance = $modal.open({
                            templateUrl: '/app/bullets/bulletentry/bulletEntryModalCtrlTemplate.html',
                            controller: 'bulletEntryModalCtrl',
                            size: 'sm',
                            });

                        modalInstance.result.then(function (gunToAdd) {
                           

                        }, function () {
                            console.info('Modal dismissed at: ' + new Date());
                        });
    };
    
    service.saveBullet = function(bulletToSave)
    {
        var httpMethod = null;
        if(bulletToSave.id)
        {
            httpMethod = $http.put;
        }
        else
        {
           httpMethod = $http.post;
        }
        
        httpMethod(service.endpoints.BULLET, bulletToSave);
        
    };
    
    return service;
}]);
