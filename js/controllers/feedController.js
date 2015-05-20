'use strict';

app.controller('feedController', function($scope, $rootScope, feedService, $log, notyService) {

    $scope.getMyFeed = function() {
        feedService.getMyFeed()
            .then(function(responseData) {
                    $scope.feedData = responseData;
                },
                function (serverError) {
                    $log.warn(serverError);
                    notyService.showError("Unable to load your feed", serverError);
                });
    };

    $scope.getMyFeed();
});