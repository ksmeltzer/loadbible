"use strict"

var app = angular.module('myApp', ['ngRoute', 'smart-table', 'ui.bootstrap', 'validation.match', 'http-auth-interceptor']);

app.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider.when('/welcome', {templateUrl: '/app/welcomeView.html'});
        $routeProvider.when('/user/register', {template: '<div registration-directive=""></div>'});
        $routeProvider.when('/user/register/confirm', {templateUrl: '/app/users/register/registrationConfirmView.html'});
        $routeProvider.when('/load/search', {template: '<div load-search-directive=""></div>'});
        $routeProvider.when('/bullet', {template: '<div bullet-list-directive=""></div>'});
        $routeProvider.otherwise({
            redirectTo: '/welcome'
        });


        $httpProvider.interceptors.push('authInterceptor');

    }

]);




app.run(['$rootScope', 'loginService', 'loadService',  function ($rootScope, loginService, loadService) {

        loadService.requestConfig();
        
        
        $rootScope.$on('event:auth-loginRequired', function () {
            loginService.showLogin();
        });
        
        
    }]);


app.factory('authInterceptor', ['$rootScope', function ($rootScope) {
        return {
            request: function ($config) {
                var auth = $rootScope.credentials;
                $config.headers['x-username'] = auth.username;
                $config.headers['x-token'] = auth.token;
                return $config;
            }
        };
    }]);

