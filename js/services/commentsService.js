'use strict';

app.factory('commentsService', function($http, $q, authenticationService, configService) {
    var service = {};
    var serviceUrl = configService.baseServiceUrl + 'posts/';

    //GET api/posts/{postId}/comments	
    service.getPostComments = function getPostComments(postId) {
        //var deferred = $q.defer();
        return $http.get(serviceUrl + postId + '/comments', authenticationService.getHeaders())
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    }
    
    //POST api/posts/{postId}/comments	
    service.addCommentToPost = function addCommentToPost(postId, commentContent) {
        //var deferred = $q.defer();
        var data = { commentContent: commentContent };
        return $http.post(serviceUrl + postId + '/comments', data, authenticationService.getHeaders());
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    }

    //PUT api/posts/{postId}/comments/{commentId}	
    service.editCommentToPost = function editCommentToPost(postId, commentId, newCommentContent) {
        //var deferred = $q.defer();
        var data = { commentContent: newCommentContent };
        return $http.put(serviceUrl + postId + '/comments/' + commentId, data, authenticationService.getHeaders());
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    }

    //DELETE api/posts/{postId}/comments/{commentId}	
    service.deleteCommentToPost = function deleteCommentToPost(postId, commentId, newCommentContent) {
        //var deferred = $q.defer();
        return $http.delete(serviceUrl + postId + '/comments/' + commentId, authenticationService.getHeaders());
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    }

    //GET api/posts/{postId}/comments/{commentId}/likes	
    service.getCommentDetailedLikes = function getCommentDetailedLikes(postId, commentId) {
        //var deferred = $q.defer();
        return $http.get(serviceUrl + postId + '/comments/' + commentId + '/likes', authenticationService.getHeaders());
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    }

    //GET api/posts/{postId}/comments/{commentId}/likes/preview	
    service.getCommentPreviewLikes = function getCommentPreviewLikes(postId, commentId) {
        //var deferred = $q.defer();
        return $http.get(serviceUrl + postId + '/comments/' + commentId + '/likes/preview', authenticationService.getHeaders());
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    }

    //POST api/posts/{postId}/comments/{commentId}/likes	
    service.likeCommnet = function likeCommnet(postId, commentId) {
       // var deferred = $q.defer();
        return $http.post(serviceUrl + postId + '/comments/' + commentId + '/likes', null, authenticationService.getHeaders());
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    }

    //DELETE api/posts/{postId}/comments/{commentId}/likes	
    service.unlikeComment = function unlikeCommnet(postId, commentId) {
        //var deferred = $q.defer();
        return $http.delete(serviceUrl + postId + '/comments/' + commentId + '/likes', authenticationService.getHeaders());
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    }

    return service;
});