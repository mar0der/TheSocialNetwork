'use strict';

app.factory('configService', function () {
    var config = {
        baseServiceUrl: "http://softuni-social-network.azurewebsites.net/api/"
    };

    return config;
});