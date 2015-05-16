'use strict';

var app = angular.module('fakeBook', ['ngRoute', 'ngResource']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

app.config(function ($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'mainController',
            resolve: {
                isLoggedIn: isLogged
            }
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'mainController',
            resolve: {
                isLoggedIn: isLogged
            }
        })
        .when('/profile/edit', {
            templateUrl: 'partials/profileEdit.html',
            controller: 'mainController',
            resolve: {
                isLoggedOut: isLoggedOut
            }
        })
        //wall
        .when('/user/:username', {
            templateUrl: 'partials/wall.html',
            controller: 'mainController',
            resolve: {
                isLoggedOut: isLoggedOut
            }
        })
        //feed
        .when('/feed', {
            templateUrl: 'partials/feed.html',
            controller: 'mainController',
            resolve: {
                isLoggedOut: isLoggedOut
            }
        })
        //home
        .when('/', {
            templateUrl: 'partials/welcome.html',
            controller: 'mainController'
        })
        .otherwise({ redirectTo: '/' });
});

function isLogged($location) {
    if (localStorage.getItem('accessToken')) {
        $location.path('/');
    }
}

function isLoggedOut($location) {
    if (!localStorage.getItem('accessToken')) {
        $location.path('/');
    }
}

