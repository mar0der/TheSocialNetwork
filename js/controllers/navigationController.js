'use strict';

app.controller('navigationController', function ($scope, $location, $timeout, $interval, profileService, usersService, notyService) {

    $scope.showNotification = false;
    $scope.showSearchResults = false;
    $scope.searchPattern = '';
    $scope.pendingRequestsDropdownShow = false;
    $scope.pendingRequests = [];
    
    //uncomment when ready for testing
    function refreshPendingRequests() {
        profileService.getFriendsRequests()
            .then(function (responseData) {
                var count = responseData.length;
                if (count) {
                    $scope.pendingRequests = responseData;
                    $scope.showNotification = true;
                    $scope.requestsCount = count;
                } else {
                    $scope.showNotification = false;
                }
            }, function (serverError) {
                notyService.showError("Can`t pull your friends requests", serverError);
            });
    }

    function getElementCoordinates(id, verticalOffset, horizontalOffset) {
        var element = document.getElementById(id);
        var box = element.getBoundingClientRect();
        return { top: box.top + (verticalOffset || 0), left: box.left + (horizontalOffset || 0) };
    }

    $scope.searchByUsername = function searchByUsername() {
        if ($scope.searchPattern !== '') {
            usersService.searchUserByName($scope.searchPattern)
                .then(function(responseData) {
                    if (responseData.length) {
                        $scope.searchResults = responseData;
                        $scope.showSearchResults = true;
                        $scope.searchResultFormCoordinates = getElementCoordinates('search-form', + 48);
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

    $scope.showPendingRequestsDetails = function showPendingRequestsDetails() {
        $scope.pendingRequestsDropdownShow = true;
        $scope.pendingRequestsFormCoordinates = getElementCoordinates('pending-requests-icon', + 52);
        console.log($scope.pendingRequestsFormCoordinates);

    }

    $scope.hidePendingRequestsDetails = function hidePendingRequestsDetails() {
        $scope.pendingRequestsDropdownShow = false;
    }

    refreshPendingRequests();

    var requestsInterval = $interval(function () {
        refreshPendingRequests();
    }, 60000);

    $scope.$on('$destroy', function () {
        $interval.cancel(requestsInterval);
    });
});