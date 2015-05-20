'use strict';

app.controller('authenticationController', function ($scope, $rootScope, $location, $route, authenticationService, notyService) {

    var ClearData = function () {
        $scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };


    ////hardcoded login
    $scope.loginData = { username: "mar0der", password: "123456" };

    $scope.login = function () {
        authenticationService.Login($scope.loginData)
        .then(function (serverData) {
            notyService.showInfo("Successful Login!");
            authenticationService.SetCredentials(serverData);
            ClearData();
            $rootScope.$broadcast('login');
            $location.path('/');
        },
        function (serverError) {
            notyService.showError("Unsuccessful Login!", serverError);
        });
    };

    $scope.register = function () {
        authenticationService.Register($scope.registerData)
        .then(function (serverData) {
            notyService.showInfo("Successful Registeration!");
            authenticationService.SetCredentials(serverData);
            ClearData();
            $rootScope.$broadcast('register');
            $location.path('/');
        },
        function (serverError) {
            notyService.showError("Unsuccessful Registeration!", serverError);
        });
    };

    $scope.clear = function () {
        $route.reload();
    }
});