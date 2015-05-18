app.factory('postService', function($http, baseUrl, headers) {

    var postService = {}
    var serviceUrl = baseUrl + 'me/';
    postService.getMyFeed = function getMyFeed() {
        var feedUrl = serviceUrl + 'feed/';
        $http.get(feedUrl, headers);
    }
    
    return postService;
});