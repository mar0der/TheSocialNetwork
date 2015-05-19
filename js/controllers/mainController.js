'use strict';

app.controller('mainController', function ($scope, $location, $route, $interval, authentication,  notyService) {
    $scope.isLoggedIn = authentication.isLoggedIn();
    $scope.isLoggedOut = !authentication.isLoggedIn();
    var service = {};

    service.GetAboutMe = function getAboutMe() {
        authentication.GetAboutMe()
            .then(function (responseData) {
                $scope.aboutMe = responseData;
            },
            function (errorData) {
                notyService.showError("Can`t pull your data!", errorData);
            });
    }

    function refreshPendingRequests() {
        //console.log('req ' +new Date().toISOString());

    }

    function refreshNewsFeed() {
        if ($location.path() === '/feed') {
            //feedController
            //console.log('feed ' + new Date().toISOString());
        }
    }

    refreshPendingRequests();
    refreshNewsFeed();

    var interval = $interval(function() {
        refreshPendingRequests();
        refreshNewsFeed();
    }, 60000);

    $scope.$on('$destroy', function() {
        $interval.cancel(interval);
    });


    return service;
});

