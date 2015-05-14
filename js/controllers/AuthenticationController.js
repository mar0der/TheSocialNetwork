'use strict';

app.controller('authenticationController', function ($scope, $location, $route, authentication, notifyService) {

    var ClearData = function () {
        $scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.login = function () {
        authentication.Login($scope.loginData, function (serverData) {
            notifyService.showInfo("Successful Login!");
            authentication.SetCredentials(serverData);
            ClearData();
            $location.path('/home');
        },
        function (serverError) {
            notifyService.showError("Unsuccessful Login!", serverError);
        });
    };

    $scope.register = function () {
        authentication.Register($scope.registerData, function (serverData) {
            notifyService.showInfo("Successful Registeration!");
            authentication.SetCredentials(serverData);
            ClearData();
            $location.path('/home');
        },
        function (serverError) {
            notifyService.showError("Unsuccessful Registeration!", serverError);
        });
    };

    $scope.logout = function () {
        notifyService.showInfo("Successful Logout!");
        ClearData();
        authentication.ClearCredentials();
        mainData.clearParams();
        $route.reload();
    };
});