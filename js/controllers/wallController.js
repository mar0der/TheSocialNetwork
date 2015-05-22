'use strict';

app.controller('wallController', function ($scope, configService, usersService, $routeParams, authenticationService) {
    $scope.config = configService;

    $scope.test = function () {
        usersService.getUserPreviewData($routeParams.username)
        .then(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    }

   // $scope.test();


    //alert($scope.isMe());

    //$scope.getUsersWallByPages = function getUserWall() {
    //   $scope.myWall = $scope.isMe();
    //}
    //$scope.getUsersWallByPages();

});