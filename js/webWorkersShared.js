(function () {
	'use strict';

	var contentH2 = document.querySelector('#header2');
	var contentH3 = document.querySelector('#header3');
	var firstNum = document.querySelector('#number1');
	var secondNum = document.querySelector('#number2');
	var userId = document.querySelector('#userId');

	var name = document.querySelector('#name');
	var username = document.querySelector('#username');
	var email = document.querySelector('#email');
	var phone = document.querySelector('#phone');

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
		// httpRequestWorker.port.postMessage('HTTP');

		userId.onchange = function () {
			httpRequestWorker.port.postMessage([userId.value]);
			console.log('User ID changed to: ' + userId.value);
		};

		httpRequestWorker.port.onmessage = function (e) {
			var data = JSON.parse(e.data);
			name.textContent = data.name;
			username.textContent = data.username;
			email.textContent = data.email;
			phone.textContent = data.phone;

			console.log('User', data.user);
			console.log('Data from HTTP request: ', e.data);
		};
	}
})();