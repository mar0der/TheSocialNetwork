'use strict';

app.controller('friendsSidebarController', function ($scope, profileService, $location, $routeParams, usersService) {
    $scope.showFriends = false;
    if ($scope.isMe()) {
        profileService.getOwnFriendsPreview()
            .then(function (responseData) {
                $scope.data = responseData;
                $scope.showFriends = true;
            });
    } else {
        usersService.getUserPreviewData($routeParams.username)
            .then(function(responseData) {
                if (responseData.isFriend) {
                    usersService.getFriendsFriendListPreview($routeParams.username)
                        .then(function (friendData) {
                            $scope.showFriends = true;
                            $scope.data = friendData;
                        }, function() {
                            $scope.showFriends = false;
                        });
                } else {
                    $scope.showFriends = false;
                }
            }, function() {
                $scope.showFriends = false;
            });

    }
});