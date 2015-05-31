'use strict';

app.controller('feedController', function ($scope, $rootScope, $location, $interval, configService, profileService, postsService, usSpinnerService, notyService) {

    $scope.config = configService;
    var feedStartPostId = '';
    $scope.feedData = [];

    $scope.getMyFeed = function () {
        if ($scope.isLoggedIn()) {

            if ($scope.busy) {
                return;
            }
            $scope.busy = true;

            usSpinnerService.spin('spinner');
            profileService.getMyFeed(feedStartPostId, 10)
            .then(function (serverResponse) {
                $scope.feedData = $scope.feedData.concat(serverResponse.data);

                if ($scope.feedData.length > 0) {
                    feedStartPostId = $scope.feedData[$scope.feedData.length - 1].id;
                }
                $scope.busy = false;
                usSpinnerService.stop('spinner');
            }, function (serverError) {
                notyService.showError("Unable to load your feed", serverError);
                usSpinnerService.stop('spinner');
            });
        }


        $scope.likePost = function (post) {
            if ($scope.isLoggedIn()) {
                usSpinnerService.spin('spinner');
                postsService.likePost(post.id)
                    .then(function () {
                        usSpinnerService.stop('spinner');
                        post.liked = true;
                        post.likesCount++;
                    },
                    function (serverError) {
                        usSpinnerService.stop('spinner');
                        notyService.showError("Failed to like post!", serverError);
                    }
                );
            }
        };

        $scope.unlikePost = function (post) {
            if ($scope.isLoggedIn()) {
                usSpinnerService.spin('spinner');
                postsService.unlikePost(post.id)
                    .then(function () {
                        usSpinnerService.stop('spinner');
                        post.liked = false;
                        post.likesCount--;
                    },
                    function (serverError) {
                        usSpinnerService.stop('spinner');
                        notyService.showError("Failed to unlike post!", serverError);
                    }
                );
            }
        };

        $scope.editPost = function editPost(post) {
            if ($scope.isLoggedIn()) {
                usSpinnerService.spin('spinner');
                postsService.editPost(post.id, post.newPostContent)
                    .then(function () {
                        post.postContent = post.newPostContent;
                        usSpinnerService.stop('spinner');
                    }, function (serverError) {
                        notyService.showError("Unable to edit post!", serverError);
                        usSpinnerService.stop('spinner');
                    }
                );
            }
        };

        $scope.deletePost = function deletePost(post) {
            if ($scope.isLoggedIn()) {
                usSpinnerService.spin('spinner');
                postsService.deletePost(post.id)
                    .then(function () {
                        var index = $scope.feedData.indexOf(post);
                        $scope.feedData.splice(index, 1);
                        usSpinnerService.stop('spinner');
                        notyService.showInfo("Post successfully deleted.");
                    },
                    function (erverError) {
                        notyService.showError("Unable to delete post!", erverError);
                        usSpinnerService.stop('spinner');
                    }
                );
            }
        };
    };

    //uncomment when we are ready for tests
    //function refreshNewsFeed() {
    //    if ($location.path() === '/') {
    //        console.log('feed ' + new Date().toISOString());
    //    }
    //}

    //refreshNewsFeed();

    //var feedInterval = $interval(function () {
    //    refreshNewsFeed();
    //}, 2000);

    //$scope.$on('$destroy', function () {
    //    $interval.cancel(feedInterval);
    //});
});