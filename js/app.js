'use strict';

var app = angular.module('fakeBook', ['ngRoute', 'ngResource']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

app.config(function ($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'authenticationController',
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'authenticationController',
        })
        //.when('/profile/edit', {
        //    templateUrl: 'partials/profileEdit.html',
        //    controller: 'authenticationController',
        //    resolve: {
        //        isLoggedOut: isLoggedOut
        //    }
        //})
        //wall
        //.when('/:username', {
        //    templateUrl: 'partials/wall.html',
        //    controller: 'personController',
        //    resolve: {
        //        isLoggedOut: isLoggedOut
        //    }
        //})
        //home
        .when('/', {
            templateUrl: 'partials/feed.html',
            controller: 'feedController',
        })
        .when('/welcome', {
            templateUrl: 'partials/welcome.html',
            controller: 'authenticationController',
        })
        .otherwise({ redirectTo: '/welcome' });
});

app.run(function ($rootScope, $location, authenticationService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if ($location.path().indexOf("login") === -1 && $location.path().indexOf("register") === -1 && !authenticationService.isLoggedIn()) {
            $location.path("/welcome");
        } 
        if (($location.path().indexOf("login") !== -1 || $location.path().indexOf("register")) !== -1 && authenticationService.isLoggedIn()) {
            $location.path("/");
        }
    });
});

