'use strict';

app.factory('configService', function () {
    var config = {
        baseServiceUrl: "http://softuni-social-network.azurewebsites.net/api/",
        leftSidebarCols: 5,
        contentCols: 14,
        rightSidebarCols: 5
};

    return config;
});