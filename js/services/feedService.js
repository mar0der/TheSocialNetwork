﻿'use strict';

app.factory('feedService', function ($http, $q, baseServiceUrl, authentication) {
    var service = {};
    var config = { headers: authentication.GetHeaders() };

    var serviceUrl = baseServiceUrl + 'me/feed/';
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