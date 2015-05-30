'use strict';

app.controller('friendsSidebarController', function ($scope, $routeParams,authenticationService, profileService, usersService) {
    $scope.showFriends = false;

    $scope.username = $routeParams.username;

    if ($scope.isMe()) {
        profileService.getOwnFriendsPreview()
            .then(function (serverResponse) {
                $scope.data = serverResponse.data;
                $scope.username = authenticationService.getUsername();
                $scope.showFriends = true;
            });
    } else {
        usersService.getUserPreviewData($scope.username)
            .then(function (serverResponse) {
                if (serverResponse.data.isFriend) {
                    usersService.getFriendsFriendListPreview($scope.username)
                        .then(function (friendsServerResponse) {
                            $scope.showFriends = true;
                            $scope.data = friendsServerResponse.data;
                        });
                }
            });
    }
});