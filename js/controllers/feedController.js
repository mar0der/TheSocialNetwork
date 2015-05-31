'use strict';

app.controller('feedController', function ($scope, $rootScope, $location, $interval, configService, profileService, usSpinnerService, notyService) {

    $scope.config = configService;
    var feedStartPostId = '';
    $scope.feedData = [];

    $scope.getMyFeed = function () {
        if ($scope.isLoggedIn()) {

            if ($scope.busy) {
                return;
            }
            $scope.busy = true;

            usSpinnerService.spin('spinner');
            profileService.getMyFeed(feedStartPostId, 10)
            .then(function (serverResponse) {
                $scope.feedData = $scope.feedData.concat(serverResponse.data);

                if ($scope.feedData.length > 0) {
                    feedStartPostId = $scope.feedData[$scope.feedData.length - 1].id;
                }
                $scope.busy = false;
                usSpinnerService.stop('spinner');
            }, function (serverError) {
                notyService.showError("Unable to load your feed", serverError);
                usSpinnerService.stop('spinner');
            });
        }

    };

    //uncomment when we are ready for tests
    //function refreshNewsFeed() {
    //    if ($location.path() === '/') {
    //        console.log('feed ' + new Date().toISOString());
    //    }
    //}

    //refreshNewsFeed();

    //var feedInterval = $interval(function () {
    //    refreshNewsFeed();
    //}, 2000);

    //$scope.$on('$destroy', function () {
    //    $interval.cancel(feedInterval);
    //});
});