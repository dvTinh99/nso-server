import WebSocket, { WebSocketServer } from "ws";

import uuid from "node-uuid";

const wss = new WebSocketServer({
  port: 8080,
});


const wsConnected = new Set();

wss.on("connection", function (ws) {

    wsConnected.add(ws);

  ws.on("close", function () {
    for (var i = 0; i < clients.length; i++) {
      if (clients[i].id == client_uuid) {
        console.log("client [%s] disconnected", client_uuid);
        clients.splice(i, 1);
      }
    }
  });
});


var timeInSecs = 120;
var ticker;
var random = 123123123;

function startTimer(secs) {
  timeInSecs = parseInt(secs);
  ticker = setInterval(tick, 1000);
}

async function tick() {
    
  var secs = timeInSecs;
  if (secs == 15) {
    random = Math.floor(Math.random() * 1000000000);
  }
  if (secs > 0) {
    timeInSecs--;
  } else {
    clearInterval(ticker);
    startTimer(16); // 4 minutes in seconds
  }

  var mins = Math.floor(secs / 60);
  secs %= 60;
  var pretty = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;

  let data = [];
  data["second"] = pretty;
  data["random"] = random;
    wsConnected.forEach(ws => 
        ws.send(JSON.stringify([pretty, random]))
    )

}
startTimer(16);