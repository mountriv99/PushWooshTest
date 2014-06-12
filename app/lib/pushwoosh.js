var PushWoosh = {
	getToken : function() {
		if (PushWoosh.deviceToken && PushWoosh.deviceToken != null)
			return PushWoosh.deviceToken;
		return Ti.Network.remoteDeviceUUID;
	},
	
	register : function(lambda, lambdaerror) {
		var method = 'POST';
		var token = PushWoosh.getToken();
		var url = PushWoosh.baseurl + 'registerDevice';
		
		var dt = new Date();
		var timezoneOffset = dt.getTimezoneOffset() * 60;	//in seconds
		var deviceTypeId = Titanium.Platform.name == "android" ? 3 : 1;
		
		var params = {
			request : {
				application : PushWoosh.appCode,
				push_token : token,
				language : Titanium.Platform.locale,
				hwid : Titanium.Platform.id,
				timezone : timezoneOffset,
				device_type : deviceTypeId
			}
		};

		payload = (params) ? JSON.stringify(params) : '';
		Ti.API.info('sending registration with params ' + payload);
		
		PushWoosh.helper(url, method, payload, lambda, lambdaerror);
	},
	
	unregister : function(lambda, lambdaerror) {
		var method = 'POST';
		var token = PushWoosh.getToken();
		var url = PushWoosh.baseurl + 'unregisterDevice';
		
		var params = {
				request : {
					application : PushWoosh.appCode,
					hwid : Titanium.Platform.id
				}
			};

		payload = (params) ? JSON.stringify(params) : '';
		Ti.API.info('sending registration with params ' + payload);
		PushWoosh.helper(url, method, payload, lambda, lambdaerror);
	},
	
	sendBadge : function(badgeNumber, lambda, lambdaerror) {
		var method = 'POST';
		var token = PushWoosh.getToken();
		var url = PushWoosh.baseurl + 'setBadge';
		
		var params = {
				request : {
					application : PushWoosh.appCode,
					hwid : Titanium.Platform.id,
					badge: badgeNumber
				}
			};

		payload = (params) ? JSON.stringify(params) : '';
		Ti.API.info('sending badge with params ' + payload);
		PushWoosh.helper(url, method, payload, lambda, lambdaerror);
	},

	sendAppOpen : function(lambda, lambdaerror) {
		var method = 'POST';
		var token = PushWoosh.getToken();
		var url = PushWoosh.baseurl + 'applicationOpen';
		
		var params = {
				request : {
					application : PushWoosh.appCode,
					hwid : Titanium.Platform.id
				}
			};

		payload = (params) ? JSON.stringify(params) : '';
		Ti.API.info('sending appOpen with params ' + payload);
		PushWoosh.helper(url, method, payload, lambda, lambdaerror);
	},

	sendPushStat : function(hashValue, lambda, lambdaerror) {
		var method = 'POST';
		var token = PushWoosh.getToken();
		var url = PushWoosh.baseurl + 'pushStat';
		
		var params = {
				request : {
					application : PushWoosh.appCode,
					hwid : Titanium.Platform.id,
					hash: hashValue
				}
			};

		payload = (params) ? JSON.stringify(params) : '';
		Ti.API.info('sending pushStat with params ' + payload);
		PushWoosh.helper(url, method, payload, lambda, lambdaerror);
	},
		
	setTags : function(tagsJsonObject, lambda, lambdaerror) {
		var method = 'POST';
		var token = PushWoosh.getToken();
		var url = PushWoosh.baseurl + 'setTags';
		
		var params = {
				request : {
					application : PushWoosh.appCode,
					hwid : Titanium.Platform.id,
					tags: tagsJsonObject
				}
			};

		payload = (params) ? JSON.stringify(params) : '';
		Ti.API.info('sending tags with params ' + payload);
		PushWoosh.helper(url, method, payload, lambda, lambdaerror);
	},
	
	helper : function(url, method, params, lambda, lambdaerror) {
		var xhr = Ti.Network.createHTTPClient();
		xhr.setTimeout(60000);
		xhr.onerror = function(e) {
			//Ti.API.log('DEBUG LOG ERROR: ' + JSON.stringify(this));
			lambdaerror(this, e);
		};
		xhr.onload = function() {
			//Ti.API.log('DEBUG LOG SEND: ' + JSON.stringify(this));
			if(this.status == 200) {
				if(lambda)
					lambda(this);
			}
			else {
				if(lambdaerror)
					lambdaerror(this);
			}
		};
		// open the client
		xhr.open(method, url);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		// send the data
		xhr.send(params);
	}
};

PushWoosh.baseurl = 'https://cp.pushwoosh.com/json/1.3/';
