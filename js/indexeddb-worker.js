onmessage = function(event) {

    var req = indexedDB.open('workerDB', 1);
    console.log('DB create successfully');

    req.onsuccess = function (e) {
        // self.postMessage('DB successfully opened');
    };

    req.onupgradeneeded = function (e) {
        var db = this.result;
        console.log('onupgradeneeded db');

        db.onerror = function (err) {
            console.log('Error loading database');
            self.postMessage(err);
        };

        var objectStore = db.createObjectStore('devices', { keyPath: 'id' });
        objectStore.createIndex('id', 'id', {unique: true});
        objectStore.createIndex('type', 'type', {unique: false});

        // Use transaction oncomplete to make sure the objectStore creation is finished before adding data into it
        objectStore.transaction.oncomplete = function(event) {
            var deviceObjectStore = db.transaction('devices', 'readwrite').objectStore('devices');

            deviceObjectStore.put({id: 1, type: 'camera'});
            deviceObjectStore.put({id: 2, type: 'tour'});
        };

        self.postMessage('Ready');
    };
};




// onmessage = function (e) {
//     var msg = e.data;
//     var valDb;
//     var request = indexedDB.open(msg.dbName, msg.dbVersion);
//
//     request.onerror = function (err) {
//         console.log('indexedDB open error: ', err.target.error);
//     };
//
//     request.onsuccess = function (event) {
//         valDb = event.target.result;
//         //var trans = valDb.transaction("numbers");
//         var store = valDb.createObjectStore("numbers");
//         var items = [];
//
//         store.oncomplete = function (evt) {
//             postMessage(evt);
//         };
//
//         var cursorRequest = store.openCursor();
//         cursorRequest.onerror = function (error) {
//             console.log(error);
//         };
//         cursorRequest.onsuccess = function (evt) {
//             var cursor = evt.target['result'];
//             if (cursor) {
//                 items.push(cursor.value);
//                 cursor.continue();
//             }
//         };
//     };
//
//     request.onupgradeneeded = function () {
//         valDb = this.result;
//     }
// };