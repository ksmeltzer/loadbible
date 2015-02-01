var app = angular.module('myApp');

app.factory('loadService', ['$http', function ($http) {
        
        
        
        var service = {endpoints: {}};
        service.config;

        service.endpoints.CONFIG = '/api/config';


        //TODO We need to push config to disk storage. We also need a header to tell us if config has changed.

        service.requestConfig = function ()
        {
            if (!service.config)
            {
                $http.get(service.endpoints.CONFIG).
                        success(function (data, status, headers, config)
                        {
                            service.config = data;
                            
                        }).
                        error(function (data, status, headers, config)
                        {
                        });
            }
        };

        return service;
    }]);