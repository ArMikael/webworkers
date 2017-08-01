(function () {
	'use strict';

	var contentH2 = document.querySelector('#header2');
	var contentH3 = document.querySelector('#header3');
	var firstNum = document.querySelector('#number1');
	var secondNum = document.querySelector('#number2');

	if (!!window.SharedWorker) {
		var shardWorker = new SharedWorker('js/shared-worker.js');
		var httpRequestWorker = new SharedWorker('js/http-worker.js');

		firstNum.onchange = function () {
			shardWorker.port.postMessage([firstNum.value, secondNum.value]);
			console.log('First number was changed.');
		};

		secondNum.onchange = function () {
			shardWorker.port.postMessage([firstNum.value, secondNum.value]);
			console.log('Second number was changed.');
		};

		shardWorker.port.onmessage = function (e) {
			contentH2.textContent = e.data;
			console.log('Message received from Shared Worker', e.data);
		};

		// HTTP Requests via Web Workers
		httpRequestWorker.port.postMessage('HTTP');

		httpRequestWorker.port.onmessage = function (e) {
			contentH3.textContent = e.data;
			console.log('Data from HTTP request: ', e.data);
		};
	}
})();