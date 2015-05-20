'use strict';

app.controller('personController', function ($scope, personService ) {

    $scope.getUserPreviewData = function getUserPreviewData() {
        console.log(personService.deletePost(453));

    }

    $scope.getUserPreviewData();
});