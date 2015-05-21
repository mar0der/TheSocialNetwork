'use strict';

app.factory('personService', function ($http, $q, authenticationService, configService) {
    var service = {};
    var headers = { headers: authenticationService.getHeaders() };



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

    service.getPostDetailedLikes = function getPostDetailedLikes(postId) {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'posts/' + postId + '/likes', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getPostLikesPreview = function getPostLikesPreview(postId) {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'posts/' + postId + '/likes/preview', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.likePost = function likePost(postId) {
        var deferred = $q.defer();
        var data = {};
        $http.post(configService.baseServiceUrl + 'posts/' + postId +'/likes', data, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.unlikePost = function unlikePost(postId) {
        var deferred = $q.defer();
        $http.delete(configService.baseServiceUrl + 'posts/' + postId + '/likes', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getPostComments = function getPostComments(postId) {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'posts/' + postId + '/comments', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.addCommentToPost = function addCommentToPost(postId, commentContent) {
        var deferred = $q.defer();
        var data = {commentContent: commentContent};
        $http.post(configService.baseServiceUrl + 'posts/' + postId + '/comments', data, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.editCommentToPost = function editCommentToPost(postId, commentId, newCommentContent) {
        var deferred = $q.defer();
        var data = { commentContent: newCommentContent };
        $http.put(configService.baseServiceUrl + 'posts/' + postId + '/comments/' + commentId, data, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.deleteCommentToPost = function deleteCommentToPost(postId, commentId, newCommentContent) {
        var deferred = $q.defer();
        $http.delete(configService.baseServiceUrl + 'posts/' + postId + '/comments/' + commentId, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getCommentDetailedLikes = function getCommentDetailedLikes(postId, commentId) {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'posts/' + postId + '/comments/' + commentId + '/likes', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getCommentPreviewLikes = function getCommentPreviewLikes(postId, commentId) {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'posts/' + postId + '/comments/' + commentId + '/likes/preview', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.likeCommnet = function likeCommnet(postId, commentId) {
        var deferred = $q.defer();
        $http.post(configService.baseServiceUrl + 'posts/' + postId + '/comments/' + commentId + '/likes', null, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.unlikeCommnet = function unlikeCommnet(postId, commentId) {
        var deferred = $q.defer();
        $http.delete(configService.baseServiceUrl + 'posts/' + postId + '/comments/' + commentId + '/likes', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getDataAboutMe = function getDataAboutMe() {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'me', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getOwnFriends = function getOwnFriends() {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'me/friends', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.getFriendsRequests = function getFriendsRequests() {
        var deferred = $q.defer();
        $http.get(configService.baseServiceUrl + 'me/requests', headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.sendFriendsRequest = function sendFriendsRequest(personUsername) {
        var deferred = $q.defer();
        $http.post(configService.baseServiceUrl + 'me/requests/'+personUsername, null, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.sendFriendsRequest = function sendFriendsRequest(personUsername) {
        var deferred = $q.defer();
        $http.post(configService.baseServiceUrl + 'me/requests/' + personUsername, null, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.approveFriendsRequest = function approveFriendsRequest(requestId) {
        var deferred = $q.defer();
        $http.put(configService.baseServiceUrl + 'me/requests/' + requestId + '/?status=approved' , null, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.rejectedFriendsRequest = function rejectedFriendsRequest(requestId) {
        var deferred = $q.defer();
        $http.put(configService.baseServiceUrl + 'me/requests/' + requestId + '/?status=rejected', null, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.changeProfilePassword = function changeProfilePassword(oldPassword, newPassword, confirmPassword) {
        var deferred = $q.defer();
        var data = { oldPassword: oldPassword, newPassword: newPassword, confirmPassword: confirmPassword };
        $http.put(configService.baseServiceUrl + 'me/changepassword/', data, headers)
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    service.editProfile = function editProfile(name, email, profileImageData, coverImageData, gender) {
        var deferred = $q.defer();
        var data = {
            name: name,
            email: email,
            profileImageData: profileImageData,
            coverImageData: coverImageData,
            gender: gender
        };
        $http.put(configService.baseServiceUrl + 'me/', data, headers)
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