var app = angular.module('myApp');

app.factory('loadService', ['$http', '$rootScope', function ($http, $rootScope) {
        
        
        
        var service = {endpoints: {}, events : {}};
        service.config;

        service.endpoints.CONFIG = '/api/config';
        
        service.events.CONFIG_LOADED = 'loadService.event.CONFIG_LOADED';


        //TODO We need to push config to disk storage. We also need a header to tell us if config has changed.

        service.requestConfig = function ()
        {
            if (!service.config)
            {
                $http.get(service.endpoints.CONFIG).
                        success(function (data, status, headers, config)
                        {
                            service.config = data;
                             $rootScope.$emit(service.events.CONFIG_LOADED, service.config);
                            
                        }).
                        error(function (data, status, headers, config)
                        {
                        });
            }
            else
            {
                 $rootScope.$emit(service.events.CONFIG_LOADED, service.config);
            }
            
           
        };

        return service;
    }]);