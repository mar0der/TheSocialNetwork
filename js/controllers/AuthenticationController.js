'use strict';

app.controller('authenticationController', function ($scope, $rootScope, $location, $route, $routeParams, usersService, authenticationService, notyService) {

    var clearData = function () {
        //$scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.isLoggedIn = authenticationService.isLoggedIn();

    //TODO: remove hardcoded login
    $scope.loginData = { username: "mar0der", password: "123456" };

    $scope.login = function login() {
        usersService.login($scope.loginData)
        .then(function (serverData) {
            notyService.showInfo("Successful Login!");
            authenticationService.setCredentials(serverData);
            $scope.isLoggedIn = authenticationService.isLoggedIn();
            clearData();
            $location.path('/');
        },
        function (serverError) {
            notyService.showError("Unsuccessful Login!", serverError);
        });
    };

    $scope.register = function register() {
        usersService.register($scope.registerData)
        .then(function (serverData) {
            notyService.showInfo("Successful Registeration!");
            authenticationService.setCredentials(serverData);
            $scope.isLoggedIn = authenticationService.isLoggedIn();
            clearData();
            $rootScope.$broadcast('register');
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
                $scope.isLoggedIn = authenticationService.isLoggedIn();
                notyService.showInfo("Successful Logout!");
                $location.path('/welcome');
            }, function (serverError) {
                authenticationService.clearCredentials();
                $scope.isLoggedIn = authenticationService.isLoggedIn();
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

    //$scope.isRealProfile = function isRealProfie() {
    //    var username = $routeParams.username;
    //    usersService.getUserPreviewData(username)
    //        .then(function (responseData) {
    //            $scope.isRealPerson = responseData;
    //        }, function () {
    //            $scope.isRealPerson = false;
    //        });
    //}

    $scope.clear = function () {
        $route.reload();
    }
});