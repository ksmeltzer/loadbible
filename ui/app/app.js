"use strict"

var app = angular.module('myApp', ['ngRoute', 'smart-table', 'ui.bootstrap', 'validation.match', 'http-auth-interceptor']);

app.config(['$routeProvider',
           function ($routeProvider){
        $routeProvider.when('/welcome', {
            templateUrl: '/app/welcomeView.html'
        });
        $routeProvider.when('/register', {
            template: '<div registration-directive=""></div>'
        });
        $routeProvider.otherwise({
            redirectTo: '/welcome'
        });

           // $rootScope.$on('event:auth-loginRequired', function(){
              //loginService.showLogin();
            //});

            }

           ]);


app.run(['$rootScope', 'loginService', function($rootScope, loginService){

    $rootScope.$on('event:auth-loginRequired', function(){
              loginService.showLogin();
            });
}]);

