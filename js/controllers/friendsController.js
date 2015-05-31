'use strict';

app.controller('friendsController', function ($scope, $location, $routeParams, configService, profileService, usersService, authenticationService, usSpinnerService, notyService) {
    $scope.config = configService;
    $scope.showFriends = function showFriends() {
        if ($scope.isLoggedIn()) {
            usSpinnerService.spin('spinner');
            var username = $routeParams.username;
            if (username === authenticationService.getUsername() || username === '') {
                profileService.getOwnFriends()
                    .then(function(serverResponse) {
                        angular.forEach(serverResponse.data, function(friend) {
                            if (!friend.profileImageData) {
                                friend.profileImageData = 'img/avatar.jpg';
                            }
                        });
                        $scope.freindsData = serverResponse.data;
                        usSpinnerService.stop('spinner');
                    }, function(serverError) {
                        notyService.showError('Cannot pull your friends list. Please check your internet connection or try later.', serverError);
                        usSpinnerService.stop('spinner');
                    });
            } else {
                usersService.getFriendsDetailedFriendList(username)
                    .then(function(serverResponse) {
                        angular.forEach(serverResponse.data, function(friend) {
                            if (!friend.profileImageData) {
                                friend.profileImageData = 'img/avatar.jpg';
                            }
                        });
                        $scope.freindsData = serverResponse.data;
                        usSpinnerService.stop('spinner');
                    }, function () {
                        usSpinnerService.stop('spinner');
                        $location.path('404');
                    });
            };
        }
    };
    $scope.showFriends();
});