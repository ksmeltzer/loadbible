    "use strict";
    var app = angular.module('myApp');
    app.directive('registrationDirective', ['userService',
        function (userService)
        {
            return {
                templateUrl: '/app/users/register/registrationDirectiveTemplate.html',
                restrict: 'A',
                scope: {
                       },
                link: function (scope, element, attr) {
                    scope.user = {};

                    scope.emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

                    scope.registerUser = function()
                    {
                        userService.save(scope.user);
                    };

                }

            };
        }]);
