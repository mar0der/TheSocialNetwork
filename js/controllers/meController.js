'use strict';

app.controller('meController', function ($scope, meService, notyService) {
    var service = {};

    service.GetAboutMe = function getAboutMe() {
        meService.GetAboutMe()
            .then(function (responseData) {
                $scope.aboutMe = responseData;
            },
            function (errorData) {
                notyService.showError("Can`t pull your data!", errorData);
            });
    }

    service.GetAboutMe();

    return service;
});

