onmessage = function(e){
    var port = e.ports[0];

    transport = new XMLHttpRequest();
    transport.open('GET', '../data.txt', true);
    transport.onreadystatechange = function(){
        if(transport.readyState == 4){
            port.postMessage(transport.response);
        }
    };
    transport.send();
};

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

