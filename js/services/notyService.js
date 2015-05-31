'use strict';

app.factory('notyService',
    function () {
        return {
            showInfo: function (msg) {
                noty({
                    text: msg,
                    type: 'success',
                    layout: 'bottomRight',
                    timeout: 1000
                });
            },
            showError: function (customMessage, serverError) {
                if (!serverError || serverError.status !== 401) {
                    if (serverError) {
                        customMessage = customMessage + "<br>" + serverError.statusMessage;
                    } else {
                        customMessage = customMessage + "<br>";
                    }
                    noty({
                        text: customMessage,
                        type: 'error',
                        layout: 'bottomRight',
                        timeout: 5000
                    });
                }
            }
        }
    }
);