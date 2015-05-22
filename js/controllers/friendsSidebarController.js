'use strict';

app.controller('friendsSidebarController', function ($scope, $routeParams, profileService, usersService) {
    $scope.showFriends = false;

    var username = $routeParams.username;

    if ($scope.isMe()) {
        profileService.getOwnFriendsPreview()
            .then(function (responseData) {
                $scope.data = responseData;
                $scope.showFriends = true;
            });
    } else {
        usersService.getUserPreviewData(username)
            .then(function (responseData) {
                if (responseData.isFriend) {
                    usersService.getFriendsFriendListPreview(username)
                        .then(function (friendData) {
                            $scope.showFriends = true;
                            $scope.data = friendData;
                        });
                }
            });
    }
});