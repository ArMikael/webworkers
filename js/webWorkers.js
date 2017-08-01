(function(){
	'use strict';

	if (window.Worker) {
		var myWorker = new Worker('js/web-worker.js'); // file with the worker functionality
		var message = { addThis: {num1:1, num2: 1}};

		myWorker.postMessage(message); 

		// Wait for response from worker and then do something
		myWorker.onmessage = function(e) {
			console.log(e.data.result);
		};
	}
})();

// Web workers runs in a separate tread, so it is doesn't have access to:
// 1) window object
// 2) document object
// 3) parent object

// Web workers have access to:
// 1) useragent
// 2) geolocation
// 3) cookeyenabled
// 4) location object (read-only) - host, hostname, href, pathname
// 5) XMLHttpRequest
// 6) setTimeout and setInterval
// 7) Application cache
// 8) Spawn one worker from another
// 9) importScripts()

// myWorker.terminate() - to stop the worker
