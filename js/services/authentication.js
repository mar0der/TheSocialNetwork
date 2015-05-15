'use strict';

app.factory('authentication', function ($http, baseServiceUrl) {
    var service = {};

    var serviceUrl = baseServiceUrl + '/users';

    service.Login = function (loginData, success, error) {
        $http.post(serviceUrl + '/login', loginData)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.Register = function (registerData, success, error) {
        $http.post(serviceUrl + '/register', registerData)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
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
        return localStorage['accessToken'];
    };

    return service;
});