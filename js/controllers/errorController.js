'use strict';

app.controller('errorController', function ($scope, $rootScope, $location, $routeParams, configService, usersService, authenticationService) {
    $scope.config = configService;

});