'use strict';

app.factory('feedService', function ($http, $q, configService, authenticationService) {
    var service = {};
    var config = { headers: authenticationService.GetHeaders() };

    var serviceUrl = configService.baseServiceUrl + 'me/feed/';
    service.getMyFeed = function () {
        var deferred = $q.defer();
        $http.get(serviceUrl + '?StartPostId&PageSize=15', config)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });

        return deferred.promise;
    }
    return service;
});