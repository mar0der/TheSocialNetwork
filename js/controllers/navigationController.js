'use strict';

app.controller('navigationController', function ($scope, $location, $timeout, $interval, profileService, usersService, authenticationService, notyService) {

    $scope.showNotification = false;
    $scope.showSearchResults = false;
    $scope.searchPattern = '';
    $scope.pendingRequestsDropdownShow = false;
    $scope.pendingRequests = [];

    //uncomment when ready for testing
    function refreshPendingRequests() {
        if (authenticationService.isLoggedIn()) {
            profileService.getFriendsRequests()
                .then(function (responseData) {
                    var count = responseData.length;
                    if (count) {
                        $scope.pendingRequests = responseData;
                        console.log($scope.pendingRequests);
                        $scope.showNotification = true;
                        $scope.requestsCount = count;
                    } else {
                        $scope.showNotification = false;
                    }
                }, function (serverError) {
                    notyService.showError('Can`t pull your friends requests' + serverError);
                });
        }
    }

    function getElementCoordinates(id, verticalOffset, horizontalOffset) {
        var element = document.getElementById(id);
        var box = element.getBoundingClientRect();
        return { top: box.top + (verticalOffset || 0), left: box.left + (horizontalOffset || 0) };
    }

    $scope.showPendingRequestsDetails = function showPendingRequestsDetails() {
        $scope.pendingRequestsDropdownShow = true;
        $scope.pendingRequestsFormCoordinates = getElementCoordinates('pending-requests-icon', +52);
    }

    $scope.hidePendingRequestsDetails = function hidePendingRequestsDetails() {
        $scope.pendingRequestsDropdownShow = false;
    }

    $scope.acceptFriendRequest = function acceptFriendRequest(requestId) {
        console.log(requestId);

        profileService.resolveFriendsRequest(requestId, 'approved')
            .then(function (responseData) {
                $scope.pendingRequests = [];
                refreshPendingRequests();
                notyService.showInfo(responseData.message);
            }, function (serverError) {
                notyService.showError('An error occured while accepting this friend requet. ' + serverError);
            });
    }

    $scope.rejectFriendRequest = function rejectFriendRequest(requestId) {
        console.log(requestId);
        profileService.resolveFriendsRequest(requestId, 'rejected')
            .then(function (responseData) {
                $scope.pendingRequests = [];
                refreshPendingRequests();
                notyService.showInfo(responseData.message);
            }, function (serverError) {
                notyService.showError('An error occured while rejecting this friend requet. ' + serverError);
            });
    }

    refreshPendingRequests();

    var requestsInterval = $interval(function () {
        refreshPendingRequests();
    }, 60000);

    $scope.$on('$destroy', function () {
        $interval.cancel(requestsInterval);
    });


    $scope.searchByUsername = function searchByUsername() {
        if ($scope.searchPattern !== '') {
            usersService.searchUserByName($scope.searchPattern)
                .then(function (responseData) {
                    if (responseData.length) {
                        $scope.searchResults = responseData;
                        $scope.showSearchResults = true;
                        $scope.searchResultFormCoordinates = getElementCoordinates('search-form', +48);
                    } else {
                        $scope.showSearchResults = false;
                    }
                }, function (serverError) {
                    $scope.showSearchResults = false;
                    notyService.showError('An error occured while searching...' + serverError);
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


});