'use strict';

app.controller('authenticationController', function ($scope, $rootScope, $location, $route, authenticationService, notyService) {

    var ClearData = function () {
       // $scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.isLoggedIn = authenticationService.isLoggedIn();

    //TODO: remove hardcoded login
    $scope.loginData = { username: "mar0der", password: "123456" };

    $scope.login = function () {
        authenticationService.login($scope.loginData)
        .then(function (serverData) {
            notyService.showInfo("Successful Login!");
            authenticationService.setCredentials(serverData);
            $scope.isLoggedIn = authenticationService.isLoggedIn();
            ClearData();
            $location.path('/');
        },
        function (serverError) {
            notyService.showError("Unsuccessful Login!", serverError);
        });
    };

    $scope.register = function () {
        authenticationService.register($scope.registerData)
        .then(function (serverData) {
            notyService.showInfo("Successful Registeration!");
            authenticationService.setCredentials(serverData);
            $scope.isLoggedIn = authenticationService.isLoggedIn();
            ClearData();
            $rootScope.$broadcast('register');
            $location.path('/');
        },
        function (serverError) {
            notyService.showError("Unsuccessful Registeration!", serverError);
        });
    };

    $scope.logout = function () {
        notyService.showInfo("Successful Logout!");
        authenticationService.clearCredentials();
        $scope.isLoggedIn = authenticationService.isLoggedIn();
        $location.path('/welcome');
    }

    $scope.clear = function () {
        $route.reload();
    }
});