
var nodes = [];
var isLeader = false;
var listUrl = 'ws://172.17.0.1:3003/';
var weight = 0;
const port = process.argv[2];
init();
function init(){
    var WebSocketClient = require('websocket').client;
    var client = new WebSocketClient(); 
    client.on('connect', function(connection) {
        console.log('WebSocket Client Connected');
    
        connection.on('message', function(message) {
            var data = message.utf8Data.split('#');
            setNodes(data);
            console.log(nodes);
            if(nodes.length === 0){
                isLeader = true;
                startLeader();    
            }else{
                weight = nodes.length;
            }
        });
        
        function sendPort() {
            if (connection.connected) {
                connection.sendUTF(port);
                //setTimeout(sendNumber, 1000);
            }
        }
        sendPort();
    });
    client.connect(listUrl, 'echo-protocol');   
}

function setNodes(data){
    for (let index = 0; index < (data.length-2); index++) {
        nodes.push(data[index]);
    }
}

function startLeader(){

const express = require('express')
const app = express()

app.get('/isAlive', (req, res) => {
  res.send(isLeader);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

}





