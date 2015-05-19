'use strict';

app.controller('authenticationController', function ($scope, $location, $route, authentication, notyService) {

    var ClearData = function () {
        $scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.loginData = { username: "mar0der", password: "123456" };
    $scope.login = function () {
        authentication.Login($scope.loginData)
        .then(function (serverData) {
            notyService.showInfo("Successful Login!");
            authentication.SetCredentials(serverData);
            ClearData();
            $location.path('/feed');
        },
        function (serverError) {
            notyService.showError("Unsuccessful Login!", serverError);
        });
    };

    $scope.register = function () {
        authentication.Register($scope.registerData)
        .then(function (serverData) {
            notyService.showInfo("Successful Registeration!");
            authentication.SetCredentials(serverData);
            ClearData();
            $location.path('/feed');
        },
        function (serverError) {
            notyService.showError("Unsuccessful Registeration!", serverError);
        });
    };

    $scope.logout = function () {
        notyService.showInfo("Successful Logout!");
        ClearData();
        authentication.ClearCredentials();
        $location.path('/');
        $route.reload();
    };

    $scope.clear = function () {
        $route.reload();
    }
});