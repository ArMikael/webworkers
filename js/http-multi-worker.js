onmessage = function (e) {
    var requests = [];
    // var requestLink = 'https://jsonplaceholder.typicode.com/photos/' + event.data.id;
    var requestLink;

    function requestHandler() {
        if (this.readyState == 4){
            if (this.status == 200 || this.status == 304 || this.status ==0) {
                postMessage(this.responseText);
            } else {
                postMessage(this.status + this.responseText);
                throw  this.status + this.responseText;
            }
        }
    }

    for (var n = 0; n < e.data.photosList.length; n++) {
        requestLink = 'https://jsonplaceholder.typicode.com/photos/' + e.data.photosList[n];

        requests[n] = new XMLHttpRequest();
        requests[n].open('GET', requestLink, true);
        requests[n].setRequestHeader('Accept', 'application/json');
        requests[n].onreadystatechange = requestHandler;
        requests[n].send();
    }

};