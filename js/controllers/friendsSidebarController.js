'use strict';

app.controller('friendsSidebarController', function ($scope, $routeParams,authenticationService, profileService, usersService) {
    $scope.showFriends = false;

    $scope.username = $routeParams.username;

    if ($scope.isMe()) {
        profileService.getOwnFriendsPreview()
            .then(function (responseData) {
                $scope.data = responseData;
                $scope.username = authenticationService.getUsername();
                $scope.showFriends = true;
            });
    } else {
        usersService.getUserPreviewData($scope.username)
            .then(function (responseData) {
                if (responseData.isFriend) {
                    usersService.getFriendsFriendListPreview($scope.username)
                        .then(function (friendData) {
                            $scope.showFriends = true;
                            $scope.data = friendData;
                        });
                }
            });
    }
});