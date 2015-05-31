'use strict';

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

    $scope.getPostAllComments = function (post) {

        if ($scope.isLoggedIn()) {
            usSpinnerService.spin('spinner');
            commentsService.getPostComments(post.id)
                .then(function (responseData) {
                    post.comments = responseData.data;
                    usSpinnerService.stop('spinner');
                },function (serverError) {
                    usSpinnerService.stop('spinner');
                    notyService.showError("Failed to load comments!", serverError);
                }
            );
        }
    };

    $scope.likeComment = function likeComment(post, comment) {
        if ($scope.isLoggedIn()) {
            usSpinnerService.spin('spinner');
            commentsService.likeCommnet(post.id, comment.id)
                .then(function () {
                    usSpinnerService.stop('spinner');
                    comment.liked = true;
                    comment.likesCount++;
                },
                function (serverError) {
                    usSpinnerService.stop('spinner');
                    notyService.showError("Unable to like comment!", serverError);
                }
            );
        }
    };

    $scope.unlikeComment = function unlikeComment(post, comment) {
        if ($scope.isLoggedIn()) {
            usSpinnerService.spin('spinner');
            commentsService.unlikeComment(post.id, comment.id)
                .then(function () {
                    usSpinnerService.stop('spinner');
                    comment.liked = false;
                    comment.likesCount--;
                },
                function (error) {
                    notyService.showError("Unable to unlike comment!", error);
                    usSpinnerService.stop('spinner');
                }
            );
        }
    };


});
