'use strict';

app.controller('wallController', function ($scope, $location, $routeParams, configService, usersService, authenticationService, postsService, notyService) {
    $scope.config = configService;
    $scope.userIsFriend = false;
    $scope.isMyWall = true;
    $scope.wallData = [];
    $scope.comment = {};

    var username = $routeParams.username;

    $scope.showWall = function showWall(username) {
        usersService.getUsersWallByPages(username, '', 10)
            .then(function (responseData) {
                $scope.wallData = responseData;
                console.log($scope.wallData);

            }, function (serverError) {
                notyService.showError('Unable to load ' + username + 'wall', serverError);
            });
    }

    $scope.postOnWall = function postOnWall() {
        if ($scope.isMyWall || $scope.isMyFriend) {
            postsService.addPost($scope.postContent, username)
                .then(function (responseData) {
                    $scope.wallData.unshift(responseData);
                    $scope.postContent = '';
                }, function (serverError) {
                    notyService.showError('Unable to post on ' + username + '`s wall', serverError);
                });
        }
    }

    $scope.postCommentOnPost = function postCommentOnPost() {
        console.log($scope.comment.commentContent);
    }

    //the script starts here
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