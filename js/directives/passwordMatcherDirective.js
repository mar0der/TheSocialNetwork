﻿app.directive('passwordMatcherDirective', function () {
    return {
        require: "ngModel",
            otherModelValue: "=passwordMatcherDirective"
        },
            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue === scope.otherModelValue;
            };
                ngModel.$validate();
            });
        }
    };
}