'use strict';

app.controller('wallController', function ($scope, $location, $routeParams, configService, usersService, authenticationService, postsService, profileService, notyService) {
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
                console.log(responseData);

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

    $scope.getDataAboutCurrentUser = function getDataAboutCurrentUser() {
        usersService.getUserData(username)
                   .then(function (responseData) {
                       $scope.userData = responseData;
                       if (username === authenticationService.getUsername()) {
                           $scope.userData.hasPendingRequest = false;
                       }
                   }, function (serverError) {
                       notyService.showError('Unable to pull the information for username ' + username, serverError);
                   });
    }

    $scope.sendFriendRequest = function sendFriendRequest(username) {
        profileService.sendFriendsRequest(username)
                   .then(function (responseData) {
                       notyService.showInfo(responseData.message);
                       $scope.userData.hasPendingRequest = true;
                   }, function (serverError) {
                       notyService.showError('Unable to send friends request to ' + username, serverError);
                   });
    }

    //like/unlike posts
    $scope.likePost = function likePost(post) {
        console.log(post);
    }
    $scope.unlikePost = function unlikePost(post) {
        console.log(post);
    }

    //the script starts here
    if (username === authenticationService.getUsername()) {
        $scope.showWall(username);
        $scope.isMyWall = true;
        $scope.isMyFriend = false;
    } else {
        usersService.getUserPreviewData(username)
            .then(function (responseData) {
                if (responseData.isFriend) {
                    $scope.isMyFriend = true;
                    $scope.isMyWall = false;
                } else {
                    $scope.isMyFriend = false;
                    $scope.isMyWall = false;
                }
                $scope.showWall(username);
            }, function () {
                $location.path('/404');
            });
    }
});