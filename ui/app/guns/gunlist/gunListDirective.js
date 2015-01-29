    "use strict";

    var app = angular.module('myApp');
    app.directive('gunListDirective', ['$modal', 'userService',
        function ($modal, userService)
        {
            return {
                templateUrl: '/app/guns/gunlist/gunListDirectiveTemplate.html',
                restrict: 'A',
                scope: {
                        user : '='
                       },
                link: function (scope, element, attr) {
                    scope.open = function () {

                        var modalInstance = $modal.open({
                            templateUrl: '/app/guns/gunentry/gunEntryModalCtrlTemplate.html',
                            controller: 'gunEntryModalCtrl',
                            size: 'sm',
                            });

                        modalInstance.result.then(function (gunToAdd) {
                            if(scope.user)
                            {
                                        userService.guns.saveGun(scope.user, gunToAdd);
                            }

                        }, function () {
                            console.info('Modal dismissed at: ' + new Date());
                        });
                    };

                    scope.deleteGun = function(gun)
                    {
                        if(scope.user) // future expansion may see this directive used for other gun managment so we test the user to see if we are editing a users gun list.
                        {
                            userService.guns.remove(scope.user, gun);
                        }
                    }

                }

            }
        }]);
