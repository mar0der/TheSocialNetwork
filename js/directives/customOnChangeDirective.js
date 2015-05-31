app.directive('customOnChangeDirective', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChangeDirective);
            element.bind('change', onChangeHandler);
        }
    };
});