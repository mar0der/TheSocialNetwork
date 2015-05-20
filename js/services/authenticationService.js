 'use strict';

app.factory('authenticationService', function ($http, $q, baseServiceUrl) {
    var service = {};

    var serviceUrl = baseServiceUrl + '/users';

    service.login = function (loginData) {
        var deferred = $q.defer();
        $http.post(serviceUrl + '/login', loginData)
            .success(function (data, status, headers, config) {
                deferred.resolve (data);
            })
            .error(function (errorData) {
                deferred.reject (errorData);
            });
        return deferred.promise;
    };

    service.register = function (registerData) {
        var deferred = $q.defer();
        $http.post(serviceUrl + '/register', registerData)
            .success(function(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    };

    //service.GetUserProfile = function (success, error) {
    //    $http.get(serviceUrl + '/profile', { headers: this.GetHeaders() })
    //        .success(function (data, status, headers, config) {
    //            success(data)
    //        }).error(error);
    //};

    //service.EditUserProfile = function (editUserData, success, error) {
    //    $http.put(serviceUrl + '/profile', editUserData, { headers: this.GetHeaders() })
    //        .success(function (data, status, headers, config) {
    //            success(data)
    //        }).error(error);
    //};

    service.setCredentials = function (serverData) {
        localStorage['accessToken'] = serverData.access_token;
        localStorage['username'] = serverData.userName;
    };

    service.getUsername = function () {
        return localStorage['username'];
    };

    service.clearCredentials = function () {
        localStorage.clear();
    };

    service.getHeaders = function () {
        return {
            Authorization: "Bearer " + localStorage['accessToken']
        };
    };

    service.isLoggedIn = function () {
        if (localStorage['accessToken']) {
            return true;
        }
        return false;
    };

    return service;
});