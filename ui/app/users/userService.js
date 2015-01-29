"use strict"

var app = angular.module('myApp');

app.factory('userService', ['$http', '$rootScope',
    function ($http, $rootScope)
    {

        $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
        var service = {};

        service.guns = {};

        service.endpoints = {};

        service.endpoints.CURRENT_USER = "/api/users/currentuser/"
        service.endpoints.USER_GUNS = service.endpoints.CURRENT_USER + "/guns/";

        service.eventNames = {};

        service.eventNames.GUN_ADDED_TO_USER = "userService.eventNames.GUN_ADDED_TO_USER";
        service.eventNames.GUN_REMOVED_FROM_USER = "userService.eventNames.GUN_REMOVED_FROM_USER";




        service.guns.saveGun = function (user, gun) {
            if (!user.guns) {
                user.guns = [];
            }

            if (!gun.id) {
                service.guns.add(user, gun);
            } else {
                service.guns.update(user, gun);
            }
        };

        service.guns.add = function (user, gunToAdd) {

            if (user.id) {

            } else // Its a new user the added gun will get saved with the user object we just need to update the UI by sending out the event
            {
                user.guns.push(gunToAdd);
                console.log(gunToAdd);
                $rootScope.$emit(service.eventNames.GUN_ADDED_TO_USER, [user, gunToAdd]);
            }

        };

        service.guns.update = function (gun) {

        };

        service.guns.remove = function (user, gunToDelete) {
            var posToRemove = -1;
            if (gunToDelete.id) //we have to go to the serve because it has already been persisted.
            {} else {
                for (var x = 0; x < user.guns.length; x++) {
                    var tmpGun = user.guns[x];
                    if (tmpGun == gunToDelete) {
                        posToRemove = x;
                        break;
                    } else if (tmpGun.manufacturer == gunToDelete.manufacturer && tmpGun.model == gunToDelete.model && tmpGun.type == gunToDelete.type) {
                        var same = true;
                        for (var i = 0; i < tmpGun.fields.length; i++) {
                            if (!tmpGun.fields[i].name == gunToDelete.fields[i].name || !tmpGun.fields[i].value == gunToDelete.fields[i].value) {
                                same = false;
                                break;
                            }
                        }

                        if (same) {
                            posToRemove = x;
                            break;

                        }
                    }
                }
            }
            if (posToRemove > -1) {
                user.guns.splice(posToRemove, 1);
                $rootScope.$emit(service.eventNames.GUN_REMOVED_FROM_USER, user);

            }
        };

        service.save = function(user)
        {
            if(!user.id) //New user we need to create the user on the back end.
            {
                //We need to sha the password.

                var forge = window.forge;
                var md = forge.md.sha512.create();
                md.update(user.password);

                var userToSend = {};
                angular.copy(user, userToSend);
                delete userToSend.password;
                userToSend.clientHash = md.digest().toHex();

                $http.post(service.endpoints.CURRENT_USER, userToSend).
                success(function (data, status, headers, config) {
                    console.log("user saved");
                    console.log(data);
                }).
                error(function (data, status, headers, config) {
                    console.error("error: ");
                    console.log(data);
                });
            }
        }




        return service;
}]);
