(function () {
    'use strict';

    var photosList = [];

    var image1 = document.querySelector('#image1');
    var image2 = document.querySelector('#image2');
    var image3 = document.querySelector('#image3');
    var image4 = document.querySelector('#image4');
    var image5 = document.querySelector('#image5');
    var image6 = document.querySelector('#image6');
    var image7 = document.querySelector('#image7');
    var image8 = document.querySelector('#image8');
    var image9 = document.querySelector('#image9');
    var image10 = document.querySelector('#image10');

    // for (var num = 1; num < 11; num++ ) {
    //     var httpWorker = new Worker('js/http-multi-worker.js');
    //
    //     httpWorker.postMessage({id: num, count: 10000 });
    // }

    for (var num = 1; num < 11; num++ ) {
        photosList.push(num);
    }

    var httpWorker = new Worker('js/http-multi-worker.js');
    httpWorker.postMessage({photosList: photosList});


    httpWorker.onmessage = function (e) {
        console.log('Data received: ', e.data);
    };

})();
