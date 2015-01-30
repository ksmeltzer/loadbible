"use strict"
var app = angular.module('myApp');

app.directive('bulletListDirective', ['bulletService', function(bulletService){
        
       return {
           templateUrl : "/app/bullets/bulletlist/bulletListDirectiveTemplate.html",
            restrict: 'A',
            scope: {},
        
            link : function(scope, element, attr) 
            {
                scope.openCreateModal = function()
                {
                    bulletService.showAddEditBulletModal();
                };
            }
        };
    }
]);