'use strict';

app.controller('wallController', function ($scope, $location, $routeParams, configService, usersService, authenticationService, postsService, profileService, usSpinnerService, notyService) {
    $scope.config = configService;
    $scope.userIsFriend = false;
    $scope.isMyWall = true;
    $scope.wallData = [];
    $scope.comment = {};
    var wallStartPostId = '';

    var username = $routeParams.username;

    $scope.loadUserWall = function () {

        if ($scope.isLoggedIn()) {
            if ($scope.busy) {
                return;
            }

            $scope.busy = true;
            usSpinnerService.spin('spinner');
            usersService.getUsersWallByPages($routeParams['username'], wallStartPostId, 10)
                .then(function (responseData) {
                    console.log(responseData.data);

                    $scope.wallData = $scope.wallData.concat(responseData.data);
                    if ($scope.wallData.length > 0) {
                        wallStartPostId = $scope.wallData[$scope.wallData.length - 1].id;
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
                usSpinnerService.spin('spinner');
                postsService.addPost($scope.postContent, username)
                    .then(function (serverResponse) {
                        $scope.wallData.unshift(serverResponse.data);
                        $scope.postContent = '';
                        usSpinnerService.stop('spinner');
                    }, function (serverError) {
                        usSpinnerService.stop('spinner');
                        notyService.showError('Unable to post on ' + username + '`s wall', serverError);
                    });
            }
        }
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
            usSpinnerService.spin('spinner');
            profileService.sendFriendsRequest(username)
            .then(function (serverResponse) {
                notyService.showInfo(serverResponse.data.message);
                $scope.userData.hasPendingRequest = true;
                usSpinnerService.stop('spinner');
            }, function (serverError) {
                usSpinnerService.stop('spinner');
                notyService.showError('Unable to send friends request to ' + username, serverError);
            });
        }
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

    $scope.likePost = function (post) {
        if ($scope.isLoggedIn()) {
            usSpinnerService.spin('spinner');
            postsService.likePost(post.id)
                .then(function () {
                    usSpinnerService.stop('spinner');
                    post.liked = true;
                    post.likesCount++;
                },
                function (serverError) {
                    usSpinnerService.stop('spinner');
                    notyService.showError("Failed to like post!", serverError);
                }
            );
        }
    };

    $scope.unlikePost = function (post) {
        if ($scope.isLoggedIn()) {
            usSpinnerService.spin('spinner');
            postsService.unlikePost(post.id)
                .then(function () {
                    usSpinnerService.stop('spinner');
                    post.liked = false;
                    post.likesCount--;
                },
                function (serverError) {
                    usSpinnerService.stop('spinner');
                    notyService.showError("Failed to unlike post!", serverError);
                }
            );
        }
    };

});