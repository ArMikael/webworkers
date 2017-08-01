// Shared Web Worker
onconnect = function(e){
    var port = e.ports[0];

    port.onmessage = function (event) {
        var requestLink = 'https://jsonplaceholder.typicode.com/users/' + event.data[0];

        transport = new XMLHttpRequest();
        transport.open('GET', requestLink, true);
        transport.onreadystatechange = function(){
            if(transport.readyState == 4){
                port.postMessage(transport.response);
            }
        };
        transport.send();
    };
};


// Dedicated Web Worker
// onmessage = function(e){
//     transport = new XMLHttpRequest();
//     transport.open('GET', '../data.txt', true);
//     transport.onreadystatechange = function(){
//         if(transport.readyState == 4){
//             postMessage(transport.response);
//         }
//     };
//     transport.send();
// };

