'use strict';

app.controller('feedController', function($scope, $rootScope, $location, $interval, configService, profileService, notyService) {

    $scope.config = configService;

    $scope.getMyFeed = function() {
        profileService.getMyFeed('', 10)
            .then(function(responseData) {
                    $scope.feedData = responseData;
                },
                function (serverError) {
                    notyService.showError("Unable to load your feed", serverError);
                });
    };

    $scope.getMyFeed();

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