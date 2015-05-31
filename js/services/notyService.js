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
                        if (serverError.statusMessage) {
                            customMessage = customMessage + "<br>" + serverError.statusMessage;
                        }
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