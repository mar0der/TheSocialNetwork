'use strict';

app.controller('mainController', function ($scope, $location, $route, $interval, authentication,  notyService) {
    $scope.isLoggedIn = authentication.isLoggedIn();
    $scope.isLoggedOut = !authentication.isLoggedIn();
    var service = {};





    //function refreshNewsFeed() {
    //    if ($location.path() === '/feed') {
    //        //feedController
    //        //console.log('feed ' + new Date().toISOString());
    //    }
    //}


    //refreshNewsFeed();

    //var interval = $interval(function() {
    //    refreshPendingRequests();
    //    refreshNewsFeed();
    //}, 60000);

    //$scope.$on('$destroy', function() {
    //    $interval.cancel(interval);
    //});


    return service;
});

