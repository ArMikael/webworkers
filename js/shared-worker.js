onconnect = function (e) {
    console.log('Inside shared worker');

    var port = e.ports[0];

    port.onmessage = function (e) {
        var result = e.data[0] * e.data[1];
        port.postMessage(result);
    };
};