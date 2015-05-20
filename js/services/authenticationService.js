'use strict';

app.factory('authenticationService', function ($http, $q, baseServiceUrl) {
    var service = {};

    var serviceUrl = baseServiceUrl + '/users';

    service.Login = function (loginData) {
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

    service.Register = function (registerData) {
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

    service.GetAboutMe = function () {
        var deffered = $q.defer();
        var config = { headers: service.GetHeaders() };
        $http.get(baseServiceUrl + 'me/', config)
            .success(function (responseData) {
                deffered.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deffered.promise;
    }

   // $scope.$broadcast('profileChanged');
    //$rootScope.$on('profileChanged', function() {

   // });

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

    service.SetCredentials = function (serverData) {
        localStorage['accessToken'] = serverData.access_token;
        localStorage['username'] = serverData.userName;
    };

    service.GetUsername = function () {
        return localStorage['username'];
    };

    service.ClearCredentials = function () {
        localStorage.clear();
    };

    service.GetHeaders = function () {
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