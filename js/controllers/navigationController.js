﻿'use strict';

app.controller('navigationController', function ($scope, $location, $timeout, $route, $interval, profileService, usersService, notyService) {

    $scope.showNotification = false;
    $scope.showSearchResults = false;
    $scope.searchPattern = '';
    $scope.pendingRequestsDropdownShow = false;
    $scope.pendingRequests = [];

    //uncomment when ready for testing
    function refreshPendingRequests() {
        if ($scope.isLoggedIn()) {
            profileService.getFriendsRequests()
                .then(function (serverResponse) {
                    var count = serverResponse.data.length;
                    if (count) {
                        $scope.pendingRequests = serverResponse.data;
                        $scope.showNotification = true;
                        $scope.requestsCount = count;
                    } else {
                        $scope.showNotification = false;
                    }
                }, function (serverError) {
                    notyService.showError('Can`t pull your friends requests', serverError);
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
        if ($scope.isLoggedIn()) {
            profileService.resolveFriendsRequest(requestId, 'approved')
            .then(function (serverResponse) {
                $scope.pendingRequests = [];
                refreshPendingRequests();
                notyService.showInfo(serverResponse.data.message);
            }, function (serverError) {
                notyService.showError('An error occured while accepting this friend requet.', serverError);
            });
        }
    }

    $scope.rejectFriendRequest = function rejectFriendRequest(requestId) {
        if ($scope.isLoggedIn()) {
            profileService.resolveFriendsRequest(requestId, 'rejected')
            .then(function (serverResponse) {
                $scope.pendingRequests = [];
                refreshPendingRequests();
                notyService.showInfo(serverResponse.data.message);
            }, function (serverError) {
                notyService.showError('An error occured while rejecting this friend requet.', serverError);
            });
        }
    }

    var requestsInterval = $interval(function () {
        refreshPendingRequests();
    }, 60000);

    $scope.$on('$destroy', function () {
        $interval.cancel(requestsInterval);
    });

    $scope.searchByUsername = function searchByUsername() {
        if ($scope.isLoggedIn()) {
            if ($scope.searchPattern !== '') {
                usersService.searchUserByName($scope.searchPattern)
                    .then(function (serverResponse) {
                        if (serverResponse.data.length) {
                            $scope.searchResults = serverResponse.data;
                            $scope.showSearchResults = true;
                            $scope.searchResultFormCoordinates = getElementCoordinates('search-form', +48);
                        } else {
                            $scope.showSearchResults = false;
                        }
                    }, function (serverError) {
                        $scope.showSearchResults = false;
                        notyService.showError('An error occured while searching...', serverError);
                    });
            } else {
                $scope.showSearchResults = false;
                $scope.searchResults = [];
            }
        }
    }

    $scope.hideSearchForm = function hideSearchForm() {
        $timeout(function () {
            $scope.showSearchResults = false;
            $scope.searchResults = [];
            $scope.searchPattern = '';
        }, 400);

    }

    $scope.$on('login', function () {
        $scope.showNotification = false;
        $scope.showSearchResults = false;
        $scope.searchPattern = '';
        $scope.pendingRequestsDropdownShow = false;
        $scope.pendingRequests = [];
        refreshPendingRequests();
    });

    $scope.$on('logout', function () {
        $scope.showNotification = false;
        $scope.showSearchResults = false;
        $scope.searchPattern = '';
        $scope.pendingRequestsDropdownShow = false;
        $scope.pendingRequests = [];
    });

    refreshPendingRequests();

});