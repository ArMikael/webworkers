onmessage = function (e) {
    var msg = e.data;
    var valDb;
    var request = indexedDB.open(msg.dbName, msg.dbVersion);

    request.onerror = function (err) {
        console.log('indexedDB open error: ', err.target.error);
    };

    request.onsuccess = function (event) {
        valDb = event.target.result;
        //var trans = valDb.transaction("numbers");
        var store = valDb.createObjectStore("numbers");
        var items = [];

        store.oncomplete = function (evt) {
            postMessage(evt);
        };

        var cursorRequest = store.openCursor();
        cursorRequest.onerror = function (error) {
            console.log(error);
        };
        cursorRequest.onsuccess = function (evt) {
            var cursor = evt.target['result'];
            if (cursor) {
                items.push(cursor.value);
                cursor.continue();
            }
        };
    };
};