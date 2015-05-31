﻿'use strict';

app.controller('wallController', function ($scope, $location, $routeParams, configService, usersService, authenticationService, postsService, profileService, usSpinnerService, notyService) {
    $scope.config = configService;
    $scope.userIsFriend = false;
    $scope.isMyWall = true;
    $scope.wallData = [];
    $scope.comment = {};
    var feedStartPostId = '';

    var username = $routeParams.username;

    $scope.loadUserWall = function () {

        if ($scope.isLoggedIn()) {
            if ($scope.busy) {
                return;
            }
            $scope.busy = true;
            usSpinnerService.spin('spinner');
            usersService.getUsersWallByPages($routeParams['username'], feedStartPostId, 10)
                .then(function (responseData) {
                    $scope.wallData = $scope.wallData.concat(responseData.data);
                    if ($scope.wallData.length > 0) {
                        feedStartPostId = $scope.wallData[$scope.wallData.length - 1].id;
                    }
                    $scope.busy = false;
                    usSpinnerService.stop('spinner');
                }, function (serverError) {
                    usSpinnerService.stop('spinner');
                    notyService.showError('Failed to load ' + $routeParams['username'] + ' wall!', serverError);
                }
            );
        }

    };

    $scope.postOnWall = function postOnWall() {
        if ($scope.isLoggedIn()) {
            if ($scope.isMyWall || $scope.isMyFriend) {
                postsService.addPost($scope.postContent, username)
                    .then(function (serverResponse) {
                        $scope.wallData.unshift(serverResponse.data);
                        $scope.postContent = '';
                    }, function (serverError) {
                        notyService.showError('Unable to post on ' + username + '`s wall', serverError);
                    });
            }
        }
    }

    $scope.postCommentOnPost = function postCommentOnPost() {
        console.log($scope.comment.commentContent);
    }

    $scope.getDataAboutCurrentUser = function getDataAboutCurrentUser() {
        if ($scope.isLoggedIn()) {
            usersService.getUserData(username)
            .then(function (serverResponse) {
                $scope.userData = serverResponse.data;
                if (username === authenticationService.getUsername()) {
                    $scope.userData.hasPendingRequest = false;
                }
            }, function (serverError) {
                notyService.showError('Unable to pull the information for username ' + username, serverError);
            });
        }
    }

    $scope.sendFriendRequest = function sendFriendRequest(username) {
        if ($scope.isLoggedIn()) {
            profileService.sendFriendsRequest(username)
            .then(function (serverResponse) {
                notyService.showInfo(serverResponse.data.message);
                $scope.userData.hasPendingRequest = true;
            }, function (serverError) {
                notyService.showError('Unable to send friends request to ' + username, serverError);
            });
        }
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
        //$scope.showWall(username);
        $scope.isMyWall = true;
        $scope.isMyFriend = false;
    } else {
        if ($scope.isLoggedIn()) {
            usersService.getUserPreviewData(username)
            .then(function (serverResponse) {
                if (serverResponse.data.isFriend) {
                    $scope.isMyFriend = true;
                    $scope.isMyWall = false;
                } else {
                    $scope.isMyFriend = false;
                    $scope.isMyWall = false;
                }

                $scope.isUserExists = true;
            }, function () {
                $location.path('/404');
            });
        }
    }
});