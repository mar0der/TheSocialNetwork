'use strict';

app.controller('profileSidebarController', function ($scope, $location, personService, notyService) {

    $scope.GetAboutMe = function getAboutMe() {
        personService.GetAboutMe()
            .then(function (responseData) {
                $scope.aboutMe = responseData;
            },
            function (errorData) {
                notyService.showError("Can`t pull your data!", errorData);
            });
    }
    if ($scope.isLoggedIn) {
        $scope.GetAboutMe();
    }
});