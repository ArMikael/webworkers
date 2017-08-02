(function(){
    'use strict';

    var indexedDbWorker = new Worker('js/indexeddb-worker.js');
    indexedDbWorker.postMessage({ dbName: 'vicondb', dbVersion: 1});

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
                alert("Type for device Id 1: " + event.target.result.type);
            };
        };
    }
})();