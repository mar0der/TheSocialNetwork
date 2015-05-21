
'use strict';

app.factory('postsService', function ($http, $q, authenticationService, configService) {
    var service = {};
    var serviceUrl = configService.baseServiceUrl + 'posts/';

    //POST api/Posts
    service.addPost = function addPost(content, username) {
        var deferred = $q.defer();
        var data = { postContent: content, username: username };
        $http.post(serviceUrl, data, authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //GET api/Posts/{id}
    service.getPostById = function getPostById(postId) {
        var deferred = $q.defer();
        $http.get(serviceUrl + postId, authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //PUT api/Posts/{id}	
    service.editPost = function editPost(postId, postContent) {
        var deferred = $q.defer();
        var data = { postContent: postContent };
        $http.put(serviceUrl + postId, data, authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //DELETE api/Posts/{id}	
    service.deletePost = function deletePost(postId) {
        var deferred = $q.defer();
        $http.delete(serviceUrl + postId, authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //GET api/Posts/{id}/likes	
    service.getPostDetailedLikes = function getPostDetailedLikes(postId) {
        var deferred = $q.defer();
        $http.get(serviceUrl + postId + '/likes', authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //GET api/Posts/{id}/likes/preview	
    service.getPostLikesPreview = function getPostLikesPreview(postId) {
        var deferred = $q.defer();
        $http.get(serviceUrl + postId + '/likes/preview', authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //POST api/Posts/{id}/likes	
    service.likePost = function likePost(postId) {
        var deferred = $q.defer();
        var data = {};
        $http.post(serviceUrl + postId + '/likes', data, authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //DELETE api/Posts/{id}/likes	
    service.unlikePost = function unlikePost(postId) {
        var deferred = $q.defer();
        $http.delete(serviceUrl + postId + '/likes', authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    return service;
});