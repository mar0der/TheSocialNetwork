'use strict';

app.controller('friendsSidebarController', function ($scope, $location, authenticationService) {
    $scope.isLoggedIn = authenticationService.isLoggedIn();
    $scope.$on('login', function () {
        $scope.isLoggedIn = true;
    });

    $scope.$on('register', function () {
        $scope.isLoggedIn = true;
    });

    $scope.$on('logout', function () {
        $scope.isLoggedIn = false;
    });

});