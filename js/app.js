'use strict';

var app = angular.module('fakeBook', ['ngRoute']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'authenticationController'
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'authenticationController'
        })
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'authenticationController'
        })
        .otherwise({ redirectTo: '/' });
});

