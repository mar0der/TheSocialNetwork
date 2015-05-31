'use strict';

app.controller('friendsSidebarController', function ($scope, $routeParams, authenticationService, profileService, usSpinnerService, usersService, notyService) {
    $scope.showFriends = false;

    $scope.username = $routeParams.username;

    if ($scope.isMe()) {
        if ($scope.isLoggedIn()) {
            profileService.getOwnFriendsPreview()
            .then(function (serverResponse) {
                $scope.data = serverResponse.data;
                $scope.username = authenticationService.getUsername();
                $scope.showFriends = true;
            }, function (serverError) {
                notyService.showError('Failed to load your friends!', serverError);
            });
        }

    } else {
        if ($scope.isLoggedIn()) {
            usersService.getUserPreviewData($scope.username)
            .then(function (serverResponse) {
                if (serverResponse.data.isFriend) {
                    usersService.getFriendsFriendListPreview($scope.username)
                        .then(function (friendsServerResponse) {
                            $scope.showFriends = true;
                            $scope.data = friendsServerResponse.data;
                        }, function (serverError) {
                            notyService.showError('Failed to load ' + $routeParams['username'] + ' friends!', serverError);
                        });
                }
            }, function (serverError) {
                notyService.showError('The user with username ' + $routeParams['username'] + ' does not exists!', serverError);
            });
        }
    }
});