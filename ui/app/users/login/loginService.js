"use strict"
var app = angular.module('myApp');

app.factory('loginService', ['$modal', '$http', '$rootScope', 'authService', function($modal, $http, $rootScope, authService){


    $rootScope.credentials = {username: "", token: ""};
    var service = {};
    service.endpoints = {};
    service.endpoints.AUTHENTICATION = '/api/users/currentuser/authenticate'

     var modalInstance = null;

    service.getAuthCredentials = function()
    {
        return $rootScope.credentials;
    };

    service.setAuthCredentials = function(username, password)
    {
         var forge = window.forge;
        var md = forge.md.sha512.create();
        md.update(password);
        var token = md.digest().toHex();
        $rootScope.credentials.username = username;
        $rootScope.credentials.token = token;
        $rootScope.credentials.password = password;

    };

    service.authenticate = function()
    {
         $http.get(service.endpoints.AUTHENTICATION).
         success(function (data, status, headers, config) {
                   authService.loginConfirmed();
                }).
                error(function (data, status, headers, config) {
                    console.error("error: ");
                    console.log(data);
                });
    }

    service.showLogin = function()
    {

         modalInstance = $modal.open({
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


app.controller('loginModalCtrl', ['$scope', '$rootScope', '$modalInstance', 'loginService', 'authService', function ($scope, $rootScope, $modalInstance, loginService, authService) {

        var credentials = loginService.getAuthCredentials();

        $scope.email = credentials.username;
        $scope.password = credentials.password;

        $scope.ok = function () {
            loginService.setAuthCredentials($scope.email, $scope.password);
            authService.loginConfirmed();
            $modalInstance.close();
            //loginService.authenticate();
        };

        $scope.cancel = function () {
           //
        };





    }]);
