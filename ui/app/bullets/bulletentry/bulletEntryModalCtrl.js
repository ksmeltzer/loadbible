"use strict"

var app = angular.module('myApp');

app.controller('bulletEntryModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){
        
        $scope.ok = function()
        {
            console.log($scope.editBullet);
            
            $modalInstance.close($scope.editBullet);
        };
        
        $scope.cancel = function()
        {
             $modalInstance.dismiss('cancel');
        };
        
}]);
