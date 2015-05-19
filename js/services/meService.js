'useStrict';

app.factory('meService', function ($http, $q, baseServiceUrl, authentication) {
    var service = {};

    service.GetAboutMe = function () {
        var deffered = $q.defer();
        var config = { headers: authentication.GetHeaders() };
        $http.get(baseServiceUrl + 'me/', config)
            .success(function (responseData) {
                deffered.resolve(responseData);
            })
            .error(function (errorData) {
                deferred.reject(errorData);
            });
        return deffered.promise;
    }

    return service;
});