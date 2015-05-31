'use strict';

app.controller('authenticationController', function ($scope, $rootScope, $location, $route, $routeParams, usersService, authenticationService, usSpinnerService, notyService) {

    var clearData = function () {
        //$scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.login = function login(loginData) {
        usSpinnerService.spin('spinner');
        usersService.login(loginData)
        .then(function (serverData) {
            notyService.showInfo("Successful Login!");
            authenticationService.setCredentials(serverData.data);
            $rootScope.$broadcast('login');
            clearData();
            usSpinnerService.stop('spinner');
            $location.path('/');
        },
        function (serverError) {
            usSpinnerService.stop('spinner');
            notyService.showError("Unsuccessful Login!", serverError);
        });
    };

    $scope.register = function register(registerData) {
        usSpinnerService.spin('spinner');
        usersService.register(registerData)
        .then(function (serverData) {
            notyService.showInfo("Successful Registeration!");
            authenticationService.setCredentials(serverData.data);
            $rootScope.$broadcast('login');
            clearData();
            usSpinnerService.stop('spinner');
            $location.path('/');
        },
        function (serverError) {
            usSpinnerService.stop('spinner');
            notyService.showError("Unsuccessful Registeration!", serverError);
        });
    };

    $scope.logout = function logout() {
        usersService.logout()
            .then(function () {
                authenticationService.clearCredentials();
                $rootScope.$broadcast('logout');
                notyService.showInfo("Successful Logout!");
                $location.path('/welcome');
            }, function () {
                authenticationService.clearCredentials();
                $location.path('/welcome');
            });
    }

    $scope.isMe = function isMe() {
        if (($location.path() === '/' + authenticationService.getUsername() || $location.path() === "/") && authenticationService.isLoggedIn()) {
            return true;
        }
        return false;
    }

    $scope.isLoggedIn = function isLoggedIn() {
        return authenticationService.isLoggedIn();
    }
    
    $scope.clear = function () {
        $route.reload();
    }
});