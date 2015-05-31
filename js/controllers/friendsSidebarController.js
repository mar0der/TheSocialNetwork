'use strict';

app.controller('friendsSidebarController', function ($scope, $routeParams, authenticationService, profileService, usSpinnerService, usersService, notyService) {
    $scope.showFriends = false;

    $scope.username = $routeParams.username;

    if ($scope.isMe()) {
        if ($scope.isLoggedIn()) {
            usSpinnerService.spin('spinner');
            profileService.getOwnFriendsPreview()
            .then(function (serverResponse) {
                $scope.data = serverResponse.data;
                $scope.username = authenticationService.getUsername();
                $scope.showFriends = true;
                usSpinnerService.stop('spinner');
            }, function (serverError) {
                usSpinnerService.stop('spinner');
                notyService.showError('Failed to load your friends!', serverError);
            });
        }

    } else {
        if ($scope.isLoggedIn()) {
            usSpinnerService.spin('spinner');
            usersService.getUserPreviewData($scope.username)
            .then(function (serverResponse) {
                if (serverResponse.data.isFriend) {
                    usersService.getFriendsFriendListPreview($scope.username)
                        .then(function (friendsServerResponse) {
                            $scope.showFriends = true;
                            $scope.data = friendsServerResponse.data;
                            usSpinnerService.stop('spinner');
                        }, function (serverError) {
                            notyService.showError('Failed to load ' + $routeParams['username'] + ' friends!', serverError);
                            usSpinnerService.stop('spinner');
                        });
                }
                usSpinnerService.stop('spinner');
            }, function () {
                usSpinnerService.stop('spinner');
            });
        }
    }
});