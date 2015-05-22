'use strict';

app.controller('wallController', function ($scope, $location, $routeParams, configService, usersService, authenticationService, notyService) {
    $scope.config = configService;
    $scope.userIsFriend = false;
    var username = $routeParams.username;

    $scope.showWall = function showWall(username) {
        usersService.getUsersWallByPages(username, '', 10)
            .then(function (responseData) {
                $scope.wallData = responseData;
            }, function (serverError) {
                notyService.showError('Unable to load ' + username + 'wall', serverError);
            });
    }
    
    if (username === authenticationService.getUsername()) {
        $scope.isMyWall = true;
        $scope.showWall(username);
    } else {
        usersService.getUserPreviewData(username)
            .then(function (responseData) {
                if (responseData.isFriend) {
                    $scope.isMyFriend = true;
                } else {
                    $scope.isMyFriend = false;
                }
                $scope.showWall(username);
            }, function () {
                $location.path('/404');
            });
    }





});