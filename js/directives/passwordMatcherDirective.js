app.directive('passwordMatcherDirective', function () {
    return {
        require: "ngModel",        scope: {
            otherModelValue: "=passwordMatcherDirective"
        },        link: function matchPassword (scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue === scope.otherModelValue;
            };            scope.$watch("someValue", function () {
                ngModel.$validate();
            });
        }
    };
});