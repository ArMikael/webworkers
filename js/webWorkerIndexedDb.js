(function(){
    'use strict';

    var indexedDbWorker = new Worker('js/indexeddb-worker.js');
    indexedDbWorker.postMessage({ dbName: 'vicondb', dbVersion: 1});

    indexedDbWorker.onmessage = function (e) {
        var data = JSON.parse(e.data);
        console.log(data);
    };
})();