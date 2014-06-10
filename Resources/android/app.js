var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var gcm = require("net.iamyellow.gcmjs");

var pendingData = gcm.data;

pendingData && null !== pendingData && Ti.API.info("******* data (started) " + JSON.stringify(pendingData));

gcm.registerForPushNotifications({
    success: function(ev) {
        Ti.API.info("******* success, " + ev.deviceToken);
    },
    error: function(ev) {
        Ti.API.info("******* error, " + ev.error);
    },
    callback: function() {
        alert("hellow yellow!");
    },
    unregister: function(ev) {
        Ti.API.info("******* unregister, " + ev.deviceToken);
    },
    data: function(data) {
        Ti.API.info("******* data (resumed) " + JSON.stringify(data));
    }
});

Alloy.createController("index");