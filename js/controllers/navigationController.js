'use strict';

app.controller('navigationController', function ($scope, $rootScope, $location, $route, notyService, authenticationService) {

    if (authenticationService.isLoggedIn) {
        $scope.isLoggedIn = true;
    } else {
        $scope.isLoggedIn = false;
    }
    
    $scope.logout = function() {
        notyService.showInfo("Successful Logout!");
        authenticationService.ClearCredentials();
        $location.path('/welcome');
        $scope.isLoggedIn = false;
    }

    $scope.$on('login', function() {
        $scope.isLoggedIn = true;
    });

    $scope.$on('register', function () {
        $scope.isLoggedIn = true;
    });
});