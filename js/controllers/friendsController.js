'use strict';

app.controller('friendsController', function ($scope, $location, $routeParams, configService, profileService, usersService, authenticationService, notyService) {
    $scope.config = configService;
    $scope.showFriends = function showFriends() {
        var username = $routeParams.username;
        if (username === authenticationService.getUsername() || username === '') {
            profileService.getOwnFriends()
                .then(function (serverResponse) {
                    angular.forEach(serverResponse.data, function (friend) {
                        if (!friend.profileImageData) {
                            friend.profileImageData = 'img/avatar.jpg';
                        }
                    });
                    $scope.freindsData = serverResponse.data;
                }, function (serverError) {
                    notyService.showError('Cannot pull your friends list. Please check your internet connection or try later.', serverError);
                });
        } else {
            usersService.getFriendsDetailedFriendList(username)
                .then(function (serverResponse) {
                    angular.forEach(serverResponse.data, function (friend) {
                        if (!friend.profileImageData) {
                            friend.profileImageData = 'img/avatar.jpg';
                        }
                    });
                    $scope.freindsData = serverResponse.data;
                }, function() {
                    $location.path('404');
                });
        };
    };
    $scope.showFriends();
});