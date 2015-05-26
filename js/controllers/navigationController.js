'use strict';

app.controller('navigationController', function ($scope, $location, $interval, profileService, notyService) {

    $scope.showNotification = false;

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
            }, function(serverError) {
                notyService.showError("Can`t pull your friends requests", serverError);
            });
    }

    //refreshPendingRequests();

    var requestsInterval = $interval(function () {
        refreshPendingRequests();
    }, 5000);

    //$scope.$on('$destroy', function () {
    //    $interval.cancel(requestsInterval);
    //});
});