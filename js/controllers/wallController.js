'use strict';

app.controller('wallController', function ($scope, $location, $routeParams, configService, usersService, authenticationService, postsService, profileService, notyService) {
    $scope.config = configService;
    $scope.userIsFriend = false;
    $scope.isMyWall = true;
    $scope.wallData = [];
    $scope.comment = {};

    var username = $routeParams.username;

    $scope.test = function test() {
        if ($scope.isLogged()) {
            alert('vliza');

        } else {
            alert('youpee');

        }
    }

    $scope.showWall = function showWall(username) {
        alert('show wall vav wall controller');
        $scope.test();
        usersService.getUsersWallByPages(username, '', 10)
            .then(function (serverResponse) {
                $scope.wallData = serverResponse.data;
            }, function (serverError, status) {
               notyService.showError('Unable to load ' + username + 'wall', serverError);
            });
    }

    $scope.postOnWall = function postOnWall() {
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

    $scope.postCommentOnPost = function postCommentOnPost() {
        console.log($scope.comment.commentContent);
    }

    $scope.getDataAboutCurrentUser = function getDataAboutCurrentUser() {
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

    $scope.sendFriendRequest = function sendFriendRequest(username) {
        profileService.sendFriendsRequest(username)
                   .then(function (serverResponse) {
                       notyService.showInfo(serverResponse.data.message);
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
            .then(function (serverResponse) {
                if (serverResponse.data.isFriend) {
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