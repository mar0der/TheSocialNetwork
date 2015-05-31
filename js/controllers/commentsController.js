﻿'use strict';

app.controller('commentsController', function ($scope, configService, usSpinnerService, commentsService, notyService) {
    $scope.config = configService;

    $scope.addCommentToPost = function addCommentToPost(post, commentContent) {
        if ($scope.isLoggedIn()) {
            usSpinnerService.spin('spinner');
            commentsService.addCommentToPost(post.id, commentContent)
                .then(function (serverResponse) {
                    $scope.newCommentData.commentContent = "";
                    post.comments.unshift(serverResponse.data);
                    post.totalCommentsCount++;
                    usSpinnerService.stop('spinner');
                }, function (serverError) {
                    notyService.showError("Unable to add comment!", serverError);
                    usSpinnerService.stop('spinner');
                });
        }
    }
});
