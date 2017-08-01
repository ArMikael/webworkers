(function () {
	'use strict';

	var contentDiv = document.querySelector('#content');
	var firstNum = document.querySelector('#number1');
	var secondNum = document.querySelector('#number2');

	if (!!window.SharedWorker) {
		var shardWorker = new SharedWorker('js/shared-worker.js');
		var httpRequestWorker = new Worker('js/http-worker.js');

		console.log('Shared workers supported');

		firstNum.onchange = function () {
			shardWorker.port.postMessage([firstNum.value, secondNum.value]);
			console.log('First number was changed.');
		};

		secondNum.onchange = function () {
			shardWorker.port.postMessage([firstNum.value, secondNum.value]);
			console.log('Second number was changed.');
		};

		shardWorker.port.onmessage = function (e) {
			contentDiv.textContent = e.data;
			console.log('Message received from Shared Worker', e.data);
			console.log('Ports', e.ports);
		};

		// HTTP Requests via Web Workers
		httpRequestWorker.postMessage('HTTP');

		httpRequestWorker.onmessage = function (e) {
			contentDiv.textContent = e.data;
			console.log('Data from HTTP request: ', e.data);
		};
	}
})();