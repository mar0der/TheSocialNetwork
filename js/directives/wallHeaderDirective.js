'use strict';

app.directive('wallHeaderDirective', function() {
    return {
        controller: 'profileSidebarController',
        templateUrl: 'partials/wallHeader.html'
    }
});