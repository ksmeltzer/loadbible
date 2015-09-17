"use strict"
var app = angular.module('myApp');

/*loginService login Service for storing and managing authentication credentials*/
app.factory('loginService', ['$modal', '$http', '$rootScope', 'authService', '$location', function ($modal, $http, $rootScope, authService, $location) {


        //Currently stored on rootscope, we do not want the credientails to persits if page is refreshed.
        $rootScope.credentials = {username: "", token: ""};
        var service = {};
        service.endpoints = {};
        service.endpoints.AUTHENTICATION = '/api/users/currentuser/authenticate';

        var modalInstance = null;

        service.getAuthCredentials = function ()
        {
            return $rootScope.credentials;
        };

        service.setAuthCredentials = function (username, password)
        {
            var forge = window.forge;
            //SHA 512 on the client as an obfusicator to eliminate sending clear text across the wire.
            //!!!!!!!!! WARNING !!!!, do not rely on this for client based security, this is not the final token only the server knows the final token
            // DO NOT USE THIS FOR ANYTHING OTHER THAN PROVIDING TO THE SERVER FOR TOKEN AUTH. IT CAN BE COMPREMISED IF THE CLIENT IS COMPRIMISED
            var md = forge.md.sha512.create();
            md.update(password);
            var token = md.digest().toHex();
            $rootScope.credentials.username = username;
            $rootScope.credentials.token = token;
            $rootScope.credentials.password = password;

        };

        service.authenticate = function ()
        {
            $http.get(service.endpoints.AUTHENTICATION).
                    success(function (data, status, headers, config) {
                        authService.loginConfirmed();
                    }).
                    error(function (data, status, headers, config) {
                        console.warn(data);
                        //No need to do anything the interceptors will handle the error and redisplay the login modal
                    });
        };


        service.showLogin = function ()
        {
            modalInstance = $modal.open({
                templateUrl: '/app/users/login/loginModalTemplate.html',
                controller: 'loginModalCtrl',
                size: 'sm'
            });
        };

        return service;
    }]);


//loginModalCtrl controller for the angular boostrap modal opened by the login service.

app.controller('loginModalCtrl', ['$scope', '$rootScope', '$modalInstance', 'loginService', 'authService', function ($scope, $rootScope, $modalInstance, loginService, authService) {

        var credentials = loginService.getAuthCredentials();

        $scope.email = credentials.username;
        $scope.password = credentials.password;

        $scope.ok = function () {
            loginService.setAuthCredentials($scope.email, $scope.password);
            authService.loginConfirmed();
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.close();
        };

    }]);
