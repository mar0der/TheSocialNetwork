'use strict';

var app = angular.module('fakeBook', ['ngRoute', 'ngResource']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

app.config(function ($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'mainController',
            resolve: {
                isLogged: isLogged
            }
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'mainController',
            resolve: {
                isLogged: isLogged
            }
        })
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'mainController'
        })
        .otherwise({ redirectTo: '/' });
});

function isLogged($location) {
    if (localStorage.getItem('accessToken')) {
        $location.path('/');
    }
}

