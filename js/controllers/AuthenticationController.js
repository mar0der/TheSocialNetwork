'use strict';

app.controller('authenticationController', function ($scope, $rootScope, $location, $route, $routeParams, usersService, authenticationService, notyService) {

    var clearData = function () {
        //$scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.login = function login(loginData) {
        usersService.login(loginData)
        .then(function (serverData) {
            notyService.showInfo("Successful Login!");
            authenticationService.setCredentials(serverData.data);
            $rootScope.$broadcast('login');
            clearData();
            $location.path('/');
        },
        function (serverError) {
            notyService.showError("Unsuccessful Login!", serverError);
        });
    };

    $scope.register = function register(registerData) {
        usersService.register(registerData)
        .then(function (serverData) {
            notyService.showInfo("Successful Registeration!");
            authenticationService.setCredentials(serverData.data);
            $rootScope.$broadcast('login');
            clearData();
            $location.path('/');
        },
        function (serverError) {
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
            }, function (serverError) {
                authenticationService.clearCredentials();
                notyService.showError("Unsuccessful Logout!", serverError);
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

    $scope.setUsersVars = function(username) {
        alert(username);
    }

    $scope.clear = function () {
        $route.reload();
    }
});