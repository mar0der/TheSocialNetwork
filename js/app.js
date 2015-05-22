'use strict';

var app = angular.module('fakeBook', ['ngRoute', 'ngResource', 'ui.bootstrap']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

app.config(function ($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'partials/login.html'
        })
        .when('/register', {
            templateUrl: 'partials/register.html'
        })
        .when('/welcome', {
            templateUrl: 'partials/welcome.html',
            controller: 'authenticationController'
        })
        .when('/profile', {
            templateUrl: 'partials/profileEdit.html',
            controller: 'profileEditController'
        })
        .when('/:username', {
            templateUrl: 'partials/wall.html',
            controller: 'wallController'
        })
        .when('/', {
            templateUrl: 'partials/feed.html',
            controller: 'feedController'
        })

        .otherwise({ redirectTo: '/welcome' });
});

app.run(function ($rootScope, $location, authenticationService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if ($location.path().indexOf("login") === -1 && $location.path().indexOf("register") === -1 && !authenticationService.isLoggedIn()) {
            $location.path("/welcome");
        }
        if (($location.path().indexOf("login") !== -1 || $location.path().indexOf("register") !== -1 || $location.path().indexOf("welcome") !== -1) && authenticationService.isLoggedIn()) {
            $location.path("/");
        }
    });
});

