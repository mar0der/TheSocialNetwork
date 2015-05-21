
'use strict';

app.factory('profileService', function ($http, $q, authenticationService, configService) {
    var service = {};
    var serviceUrl = configService.baseServiceUrl + 'me/';

    //GET api/me	
    service.getDataAboutMe = function getDataAboutMe() {
        var deferred = $q.defer();
        var headers = { headers: authenticationService.getHeaders() };
        $http.get(serviceUrl, authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //PUT api/me	
    service.editProfile = function editProfile(name, email, profileImageData, coverImageData, gender) {
        var deferred = $q.defer();
        var data = {
            name: name,
            email: email,
            profileImageData: profileImageData,
            coverImageData: coverImageData,
            gender: gender
        };
        $http.put(serviceUrl, data, authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //PUT api/me/ChangePassword	
    service.changeProfilePassword = function changeProfilePassword(oldPassword, newPassword, confirmPassword) {
        var deferred = $q.defer();
        var data = { oldPassword: oldPassword, newPassword: newPassword, confirmPassword: confirmPassword };
        $http.put(serviceUrl + 'changepassword/', data, authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //GET api/me/friends	
    service.getOwnFriends = function getOwnFriends() {
        var deferred = $q.defer();
        $http.get(serviceUrl + 'friends', authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //GET api/me/friends/preview	
    service.getOwnFriendsPreview = function getOwnFriendsPreview() {
        var deferred = $q.defer();
        $http.get(serviceUrl + 'friends/preview', authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //GET api/me/feed?StartPostId={StartPostId}&PageSize={PageSize}	
    service.getMyFeed = function getMyFeed(startPostId, pageSize) {
        var deferred = $q.defer();
        $http.get(serviceUrl + 'feed/?StartPostId=' + startPostId + '&PageSize=' + pageSize, authenticationService.getHeaders())
             .success(function (data) {
                 deferred.resolve(data);
             })
             .error(function (errorData) {
                 deferred.reject(errorData);
             });

        return deferred.promise;
    }

    //GET api/me/requests	
    service.getFriendsRequests = function getFriendsRequests() {
        var deferred = $q.defer();
        $http.get(serviceUrl + 'requests', authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //PUT api/me/requests/{requestId}?status={status}	
    service.resolveFriendsRequest = function approveFriendsRequest(requestId, status) {
        var deferred = $q.defer();
        $http.put(serviceUrl + 'requests/' + requestId + '/?status=' + status, null, authenticationService.getHeaders())
            .success(function (responseData) {
                deferred.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deferred.promise;
    }

    //POST api/me/requests/{username}	
    service.sendFriendsRequest = function sendFriendsRequest(personUsername) {
        var deferred = $q.defer();
        $http.post(serviceUrl + 'requests/' + personUsername, null, authenticationService.getHeaders())
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