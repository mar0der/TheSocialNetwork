'use strict';

app.controller('mainController', function ($scope, $location, $route, authentication, notyService) {
    $scope.isLoggedIn = authentication.isLoggedIn();
    $scope.isLoggedOut = !authentication.isLoggedIn();
});

