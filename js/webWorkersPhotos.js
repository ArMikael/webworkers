(function () {
    'use strict';

    var photosList = [];
    var container = document.querySelector('#container');

    // for (var num = 1; num < 11; num++ ) {
    //     var httpWorker = new Worker('js/http-multi-worker.js');
    //
    //     httpWorker.postMessage({id: num, count: 10000 });
    // }

    for (var num = 1; num < 2000; num++ ) {
        photosList.push(num);
    }

    var httpWorker = new Worker('js/http-multi-worker.js');
    httpWorker.postMessage({photosList: photosList});


    httpWorker.onmessage = function (e) {
        console.log('Data received: ', e.data);
        var data = JSON.parse(e.data);
        var img = document.createElement('img');
        img.setAttribute('src', data.thumbnailUrl);
        container.appendChild(img);
    };

})();
