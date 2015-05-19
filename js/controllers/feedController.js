﻿'use strict';

app.controller('feedController', function($scope, feedService, notyService) {

    $scope.getMyFeed = function() {
        feedService.getMyFeed()
            .then(function(responseData) {
                    $scope.feedData = responseData;
                },
                function (serverError) {
                    notyService.showError("Unable to load your feed", serverError);
                });
    };

    $scope.getMyFeed();
});