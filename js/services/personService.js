'use strict';

app.factory('personService', function ($http, $q, authenticationService, configService) {
    var service = {};
    var headers = { headers: authenticationService.getHeaders() };

    service.getAboutMe = function () {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'me/', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getUserPreviewData = function getUserPreviewData(username) {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'users/' + username + '/preview', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getUserData = function getUserData(username) {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'users/' + username, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.searchUserByName = function searchUserByName(searchTerm) {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'users/search?searchTerm=' + searchTerm, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getUsersWallByPages = function getFriendUsersByPages(friendName, startPostId, pageSize) {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'users/' + friendName + '/wall?StartPostId=' + startPostId + '&PageSize=' + pageSize, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getFriendsDetailedFriendList = function getFriendsDetailedFriendList(friendName) {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'users/' + friendName + '/friends', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getFriendsFriendListPreview = function getFriendsFriendListPreview(friendName) {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'users/' + friendName + '/friends/preview', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getPostById = function getPostById(postId) {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'posts/' + postId, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.addPost = function addPost(content, username) {
        var deferred = $q.defer();
        var data = { postContent: content, username: username };
        $http.post(configService.baseServiceUrl + 'posts/', data, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.editPost = function editPost(postId, postContent) {
        var deferred = $q.defer();
        var data = { postContent: postContent};
        $http.put(configService.baseServiceUrl + 'posts/' + postId, data, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.deletePost = function deletePost(postId) {
        var deferred = $q.defer();
        $http.delete(configService.baseServiceUrl + 'posts/' + postId, headers)
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