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
                customMessage = customMessage + "<br>" + serverError.statusMessage;
                if (serverError.status !== 401) {
                    alert(serverError.status);
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