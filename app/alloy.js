// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
/*
	var pushnotifications = require('com.arellomobile.push');
	Ti.API.info("module is => " + pushnotifications);
	
	pushnotifications.pushNotificationsRegister("230593967008", "77495-A41E6", {
		//NOTE: all the functions fire on the background thread, do not use any UI or Alerts here
		success:function(e)
		{
			Ti.API.info('TITAIUM!!! JS registration success event: ' + e.registrationId);
		},
		error:function(e)
		{
			Ti.API.error("TITAIUM!!! Error during registration: "+e.error);
		},
		callback:function(e) // called when a push notification is received
		{
			Ti.API.info('TITAIUM!!! JS message event: ' + JSON.stringify(e.data));
		}
	});
*/
/*
var pushnotifications = require('com.arellomobile.push');

function messageCallback(data) {
	Ti.API.info('Push message event: ' + data);
}

var pendingData = pushnotifications.data;
if (pendingData && pendingData !== null) {
	messageCallback(pendingData.data);
}

pushnotifications.pushNotificationsRegister("230593967008", "77495-A41E6", {
	success : function(e) {
		Ti.API.info('JS registration success event: ' + e.registrationId);
	},
	error : function(e) {
		Ti.API.error("Error during registration: " + e.error);
	},
	callback : function(e) // called when a push notification is received
	{
		messageCallback(e.data);
	}
});
*/


Ti.include('pushwoosh.js');
PushWoosh.appCode = "B69E3-A7360";

var gcm = require('net.iamyellow.gcmjs');

var pendingData = gcm.data;
if (pendingData && pendingData !== null) {
	// if we're here is because user has clicked on the notification
	// and we set extras for the intent 
	// and the app WAS NOT running
	// (don't worry, we'll see more of this later)
	Ti.API.info('******* data (started) ' + JSON.stringify(pendingData));
}

gcm.registerForPushNotifications({
	success: function (ev) {
		// on successful registration
		Ti.API.info('******* success, ' + ev.deviceToken);
		PushWoosh.deviceToken = ev.deviceToken;
		PushWoosh.register(function(data) {
			Ti.API.debug("PushWoosh register success: " + JSON.stringify(data));
		}, function(e) {
			Ti.API.warn("Couldn't register with PushWoosh: " + JSON.stringify(e));
		});
	},
	error: function (ev) {
		// when an error occurs
		Ti.API.info('******* error, ' + ev.error);
	},
	callback: function () {
		// when a gcm notification is received WHEN the app IS IN FOREGROUND
		alert('hellow yellow!');
	},
	unregister: function (ev) {
		// on unregister 
		Ti.API.info('******* unregister, ' + ev.deviceToken);
	},
	data: function (data) {
		// if we're here is because user has clicked on the notification
		// and we set extras in the intent 
		// and the app WAS RUNNING (=> RESUMED)
		// (again don't worry, we'll see more of this later)
		Ti.API.info('******* data (resumed) ' + JSON.stringify(data));
	}
});

// in order to unregister:
// require('net.iamyellow.gcmjs').unregister();
