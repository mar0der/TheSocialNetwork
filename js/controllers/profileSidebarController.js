'use strict';

app.controller('profileSidebarController', function ($scope, $location, profileService, notyService) {

    $scope.getDataAboutMe = function getAboutMe() {
        profileService.getDataAboutMe()
            .then(function (responseData) {
                $scope.aboutMe = responseData;
            },
            function (errorData) {
                notyService.showError("Can`t pull your data!", errorData);
            });
    }
    if ($scope.isLoggedIn) {
        $scope.getDataAboutMe();
    }
});