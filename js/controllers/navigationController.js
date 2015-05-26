'use strict';

app.controller('navigationController', function ($scope, $location, $timeout, $interval, profileService, usersService, notyService) {

    $scope.showNotification = false;
    $scope.showSearchResults = false;
    $scope.searchPattern = '';


    //uncomment when ready for testing
    function refreshPendingRequests() {
        profileService.getFriendsRequests()
            .then(function (responseData) {
                var count = responseData.length;
                if (count) {
                    $scope.showNotification = true;
                    $scope.requestsCount = count;
                } else {
                    $scope.showNotification = false;
                }
            }, function (serverError) {
                notyService.showError("Can`t pull your friends requests", serverError);
            });
    }

    $scope.searchByUsername = function searchByUsername() {
        if ($scope.searchPattern !== '') {
            usersService.searchUserByName($scope.searchPattern)
                .then(function(responseData) {
                    if (responseData.length) {
                        $scope.searchResults = responseData;
                        $scope.showSearchResults = true;
                    } else {
                        $scope.showSearchResults = false;
                    }
                }, function(serverError) {
                    $scope.showSearchResults = false;
                    notyService.showError("An error occured while searching...", serverError);
                });
        } else {
            $scope.showSearchResults = false;
            $scope.searchResults = [];
        }
    }

    $scope.hideSearchForm = function hideSearchForm() {
        $timeout(function () {
            $scope.showSearchResults = false;
            $scope.searchResults = [];
            $scope.searchPattern = '';
        }, 400);

    }

    refreshPendingRequests();

    var requestsInterval = $interval(function () {
        refreshPendingRequests();
    }, 60000);

    $scope.$on('$destroy', function () {
        $interval.cancel(requestsInterval);
    });
});