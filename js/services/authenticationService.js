'use strict';

app.factory('authenticationService', function () {
    var service = {};

    service.setCredentials = function setCredentials(serverData) {
        localStorage['accessToken'] = serverData.access_token;
        localStorage['username'] = serverData.userName;
    };

    service.getUsername = function getUsername() {
        return localStorage['username'];
    };

    service.clearCredentials = function clearCredentials() {
        localStorage.clear();
    };

    service.getHeaders = function getHeaders() {
        return {
            Authorization: "Bearer " + localStorage['accessToken']
        };
    };

    service.isLoggedIn = function isLoggedIn() {
        if (localStorage['accessToken']) {
            return true;
        }
        return false;
    };

    return service;
});