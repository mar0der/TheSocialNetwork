'use strict';

app.controller('profileController', function ($scope, $location, profileService, notyService) {

    $scope.getFullDataAboutMe = function getFullDataAboutMe() {
        if ($scope.isLoggedIn) {
            profileService.getdata()
                .then(function (responseData) {
                    $scope.aboutMe = responseData;
                },
                function (errorData) {
                    notyService.showError("Can`t pull your data!", errorData);
                });
        }
    }

    $scope.changePassword = function changePassword() {
        profileService.changeProfilePassword($scope.changePasswordData)
            .then(function () {
                    notyService.showInfo('The password was successfuly changed');
                    $location.path('/');
                },
            function (errorData) {
                notyService.showError("The password cannot be changed!", errorData);
            });
    };

});;