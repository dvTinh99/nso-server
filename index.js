import WebSocket, { WebSocketServer } from "ws";

import env from "dotenv";
env.config();

import app from "./server.js";

const wss = new WebSocketServer({
  port: process.env.WEBSOCKET_PORT || 8080,
});


const wsConnected = new Set();

wss.on("connection", function (ws) {

  wsConnected.add(ws);

  ws.on("close", function () {
  });
});


var timeInSecs = 120;
var ticker;
var random = 123123123;
var historyLastNumber = [];


function startTimer(secs) {
  timeInSecs = parseInt(secs);
  ticker = setInterval(tick, 1000);
}

async function tick() {
    
  var secs = timeInSecs;
  if (secs == 2) {
    random = Math.floor(Math.random() * 1000000000);

    let split = String(random).split("");
    let sumSplitRandom = 0;
         
    for (let i of split) {
        sumSplitRandom += parseInt(i);
    }

    let lastNumber = sumSplitRandom % 10;
    if (historyLastNumber.length >= 13) {
        historyLastNumber.shift();
        historyLastNumber.push(lastNumber);
    } else {

        historyLastNumber.push(lastNumber);
    }

  }
  if (secs > 0) {
    timeInSecs--;
  } else {
    clearInterval(ticker);
    startTimer(2*60); // 4 minutes in seconds
  }

  var mins = Math.floor(secs / 60);
  secs %= 60;
  var pretty = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;

  let data = [];
  data["second"] = pretty;
  data["random"] = random;
  wsConnected.forEach(ws => 
    ws.send(JSON.stringify([pretty, random, historyLastNumber]))
  )

}
startTimer(2*60);