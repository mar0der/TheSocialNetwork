'use strict';

app.controller('mainController', function ($scope, $location, $route, authentication, notyService) {
    $scope.isLoggedIn = authentication.isLoggedIn();
    $scope.isLoggedOut = !authentication.isLoggedIn();

    var service = {};

    //service.GetAboutMe = function getAboutMe() {
    //    alert(1);
    //    authentication.GetAboutMe()
    //        .then(function (responseData) {
    //            console.log(responseData);
    //            alert(1);


    //            $scope.aboutMe = responseData;
    //        },
    //        function (errorData) {
    //            notyService.showError("Can`t pull your data!", errorData);
    //        });
    //}

    return service;
});

