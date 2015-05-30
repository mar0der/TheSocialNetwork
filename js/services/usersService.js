'use strict';

app.factory('usersService', function ($http, $q, authenticationService, configService) {
    var service = {};
    var serviceUrl = configService.baseServiceUrl + 'users/';

    //POST api/users/Register	
    service.register = function (registerData) {
        //var deferred = $q.defer();
        return $http.post(serviceUrl + 'register', registerData);
        //    .success(function (data) {
        //        deferred.resolve(data);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    };

    //POST api/users/Login	
    service.login = function (loginData) {
        //var deferred = $q.defer();
        return $http.post(serviceUrl + 'login', loginData);
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    };

    //POST api/users/Logout	
    service.logout = function () {
        //var deferred = $q.defer();
        return $http.post(serviceUrl + 'logout', null, authenticationService.getHeaders());
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    };

    //GET api/users/{username}/preview	
    service.getUserPreviewData = function getUserPreviewData(username) {
        //var deferred = $q.defer();
        return $http.get(serviceUrl + username + '/preview', authenticationService.getHeaders());
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    }

    //GET api/users/search?searchTerm={searchTerm}	
    service.searchUserByName = function searchUserByName(searchTerm) {
        //var deferred = $q.defer();
        return $http.get(serviceUrl + 'search?searchTerm=' + searchTerm, authenticationService.getHeaders());
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    }

    //GET api/users/{username}	
    service.getUserData = function getUserData(username) {
        //var deferred = $q.defer();
        return $http.get(serviceUrl + username, authenticationService.getHeaders());
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    }

    //GET api/users/{username}/wall?StartPostId={StartPostId}&PageSize={PageSize}	
    service.getUsersWallByPages = function getFriendUsersByPages(friendName, startPostId, pageSize) {
        return $http.get(serviceUrl + friendName + '/wall?StartPostId=' + startPostId + '&PageSize=' + pageSize, authenticationService.getHeaders())
    }

    //GET api/users/{username}/friends/preview	
    service.getFriendsFriendListPreview = function getFriendsFriendListPreview(friendName) {
        //var deferred = $q.defer();
        return $http.get(serviceUrl + friendName + '/friends/preview', authenticationService.getHeaders());
        //    .success(function (responseData) {
        //        deferred.resolve(responseData);
        //    })
        //    .error(function (errorData) {
        //        deferred.reject(errorData);
        //    });
        //return deferred.promise;
    }

    //GET api/users/{username}/friends	
    service.getFriendsDetailedFriendList = function getFriendsDetailedFriendList(friendName) {
        //var deferred = $q.defer();
        return $http.get(serviceUrl + friendName + '/friends', authenticationService.getHeaders());
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