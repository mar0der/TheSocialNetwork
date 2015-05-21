'use strict';

app.controller('personController', function ($scope, personService ) {

    $scope.getUserPreviewData = function getUserPreviewData() {
        console.log(personService.getPostComments(452));
        console.log(personService.editCommentToPost(452, 1244,  'Cool shit1'));

    }

    $scope.getUserPreviewData();
});