(function(){
    'use strict';

    var createBtn = document.querySelector('#createDbBtn');
    var readBtn = document.querySelector('#readFromDbBtn');
    var sessionBtn = document.querySelector('#sessionBtn');
    var dataHeader = document.querySelector('#dbData');

    var indexedDbWorker = new Worker('js/indexeddb-worker.js');

    createBtn.onclick = function () {
        console.log('Create button clicked');
        indexedDbWorker.postMessage({ dbName: 'vicondb', dbVersion: 1});
    };

    readBtn.onclick = function () {
        console.log('Read button clicked');
        readFromDbHandler();
    };

    sessionBtn.onclick = function () {
        console.log('Session storage clicked');
        sessionStorage.setItem('session', 4678930);

        var data = sessionStorage.getItem('session');
        console.log(data);

        var sessionWorker = new Worker('js/session-worker.js');
        sessionWorker.postMessage('Run');
    };

    indexedDbWorker.onmessage = function (e) {
        // var data = JSON.parse(e.data);
        // console.log(data);
        console.log(e.data);

        readFromDbHandler();
    };

    // Reading data from database
    function readFromDbHandler() {
        var request = indexedDB.open('workerDB');
        var db;

        request.onerror = function(err) {
            alert("Why didn't you allow my web app to use IndexedDB?!", err);
        };

        request.onsuccess = function(event) {
            db = event.target.result;

            db.transaction('devices').objectStore('devices').get(1).onsuccess = function(event) {
                dataHeader.textContent = event.target.result.type;
            };
        };
    }
})();