'use strict';

app.controller('profileController', function ($scope, $location, profileService, usSpinnerService, notyService) {

    $scope.getFullDataAboutMe = function getFullDataAboutMe() {
        if ($scope.isLoggedIn()) {
            profileService.getDataAboutMe()
                .then(function (serverResponse) {
                    $scope.aboutMeData = serverResponse.data;
                },
                function (errorData) {
                    notyService.showError("Can`t pull your data!", errorData);
                });
        }
    }

    $scope.updateProfile = function updateProfile() {
        if ($scope.isLoggedIn()) {
            profileService.editProfile($scope.aboutMeData)
                .then(function (serverResponse) {
                    notyService.showInfo(serverResponse.data.message);
                    $location.path('/' + $scope.aboutMeData.username);
                }, function (errorData) {
                    notyService.showError("Can't update your profile", errorData);
                });
        }
    }

    $scope.processImage = function (event) {
        var inputElement,
            imageFile,
            fileReader,
            sizeLimit;

        if (event.target.id === 'input-profile-image') {
            inputElement = $('#input-profile-image');
            sizeLimit = 131072;
        } else if (event.target.id === 'input-cover-image') {
            inputElement = $('#input-cover-image');
            sizeLimit = 1048576;
        } else {
            return false;
        }

        imageFile = event.target.files[0];

        if (imageFile && !imageFile.type.match(/image\/.*/)) {
            notyService.showError("Invalid image format!");
            inputElement.val('');
        } else if (imageFile && imageFile.size > sizeLimit) {
            notyService.showError('This image is too big. The limit is ' + sizeLimit / 1024 + ' kB');
            inputElement.val('');
        } else if (imageFile) {
            fileReader = new FileReader();
            fileReader.onload = function () {
                if (event.target.id === 'input-profile-image') {
                    $scope.aboutMeData.profileImageData = fileReader.result;
                } else {
                    $scope.aboutMeData.coverImageData = fileReader.result;
                }
                $scope.$apply();
            };
            fileReader.readAsDataURL(imageFile);
        }
    }

    $scope.triggerInputFileField = function triggerInputFileField(element) {
        angular.element(element).trigger('click');
    };

    $scope.changePassword = function changePassword() {
        if ($scope.isLoggedIn()) {
            usSpinnerService.spin('spinner');
            profileService.changeProfilePassword($scope.changePasswordData)
            .then(function () {
                usSpinnerService.stop('spinner');
                notyService.showInfo('The password was successfuly changed');
                $location.path('/');
            },
            function (errorData) {
                usSpinnerService.stop('spinner');
                notyService.showError("The password cannot be changed!", errorData);
            });
        }
    };
});