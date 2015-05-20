'use strict';

app.factory('personService', function ($http, $q, authenticationService, configService) {
    var service = {};

    service.GetAboutMe = function () {
        var deffered = $q.defer();
        var config = { headers: authenticationService.getHeaders() };
        $http.get(configService.baseServiceUrl + 'me/', config)
            .success(function (responseData) {
                deffered.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deffered.promise;
    }

    return service;
});