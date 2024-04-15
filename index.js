import WebSocket, { WebSocketServer } from "ws";

import env from "dotenv";
env.config();

import app from "./api.js";
import HistoryRepo from './repositories/history.repositories.js';

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
var random = getRandomInt(1000000000);

var get13Record = await HistoryRepo.getResultHistory(13)
var historyLastNumber = Array.from(get13Record, (x) => x.result);

var xuThisGame = 0;
var xuPreviousGame = 0;
if (get13Record.length > 0) {

  var xuThisGame = get13Record[get13Record.length - 1].xu;
  var xuPreviousGame = get13Record[get13Record.length - 2].xu;
}

var timeOneGame = 2 * 60;
var timeStartRandom = 15;


function startTimer(secs) {
  timeInSecs = parseInt(secs);
  ticker = setInterval(tick, 1000);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function tick() {
    
  var secs = timeInSecs;
  if (secs == timeStartRandom) {
    xuPreviousGame = xuThisGame;
    random = getRandomInt(1000000000);
  }

  if (secs == 0) {
    xuThisGame = getRandomInt(99999);
    let split = String(random).split("");
    let sumSplitRandom = 0;
         
    for (let i of split) {
        sumSplitRandom += parseInt(i);
    }

    let lastNumber = sumSplitRandom % 10;

    let history = {
      xu : xuThisGame,
      result : lastNumber,
      total_result: sumSplitRandom,
      sum: random,
    }
    if (historyLastNumber.length >= 13) {
      historyLastNumber.shift();
      // await HistoryRepo.shift();
      historyLastNumber.push(lastNumber);
      await HistoryRepo.create(history);
    } else {
      await HistoryRepo.create(history);
      historyLastNumber.push(lastNumber);
    }
  }
  if (secs > 0) {
    timeInSecs--;
  } else {
    clearInterval(ticker);
    startTimer(timeOneGame); // 4 minutes in seconds
  }

  var mins = Math.floor(secs / 60);
  secs %= 60;
  var pretty = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;

  let data = [];
  data["second"] = pretty;
  data["random"] = random;
  wsConnected.forEach(ws => 
    ws.send(JSON.stringify([pretty, random, historyLastNumber, xuThisGame, xuPreviousGame]))
  )

}
startTimer(timeOneGame);