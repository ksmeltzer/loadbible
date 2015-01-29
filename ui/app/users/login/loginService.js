"use strict"
var app = angular.module('myApp');

app.factory('loginService', ['$modal', function($modal){


    var service = {};

    service.showLogin = function()
    {
         var modalInstance = $modal.open({
                            templateUrl: '/app/users/login/loginModalTemplate.html',
                            controller: 'loginModalCtrl',
                            size: 'sm',
                            });

                        modalInstance.result.then(function (response) {


                        }, function () {
                            console.info('Modal dismissed at: ' + new Date());
                        });
    };

    return service;
}]);


app.controller('loginModalCtrl', ['$scope', '$rootScope', '$modalInstance', function ($scope, $rootScope, $modalInstance) {


        $scope.ok = function () {
            //$modalInstance.close($scope.editGun);
        };

        $scope.cancel = function () {
           // $modalInstance.dismiss('cancel');
        };





    }]);
