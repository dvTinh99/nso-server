import WebSocket, { WebSocketServer } from "ws";

import env from "dotenv";
env.config();

const wss = new WebSocketServer({
    port: process.env.WEBSOCKET_PORT || 8080,
});

const wsConnected = new Set();
var timeInSecs = 120;
var ticker;
var random = getRandomInt(1000000000);

// var get13Record = await HistoryRepo.getResultHistory(13);
var get13Record = [{result : 4, xu : 3}, {result : 4, xu : 3}, {result : 4, xu : 3}, {result : 4, xu : 3},{result : 4, xu : 3} ,{result : 4, xu : 3} ,{result : 4, xu : 3}];
var historyLastNumber = Array.from(get13Record, (x) => x.result);

var xuThisGame = 0;
var xuPreviousGame = 0;
if (get13Record.length > 0) {
    var xuThisGame = get13Record[get13Record.length - 1].xu;
    var xuPreviousGame = get13Record[get13Record.length - 2].xu;
}

var timeOneGame = 2 * 60;
var timeStartRandom = 15;
var spinCode = null;

function startTimer(secs) {
    timeInSecs = parseInt(secs);
    ticker = setInterval(tick, 1000);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandom(length) {
    return Math.floor(
        Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
}

async function tick() {
    var secs = timeInSecs;
    if (secs == timeStartRandom) {
        xuPreviousGame = xuThisGame;
        random = getRandom(9);
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
            xu: xuThisGame,
            result: lastNumber,
            total_result: sumSplitRandom,
            sum: random,
        };
        if (historyLastNumber.length >= 13) {
            historyLastNumber.shift();
            // await HistoryRepo.shift();
            historyLastNumber.push(lastNumber);
            // await HistoryRepo.create(history);
        } else {
            // await HistoryRepo.create(history);
            historyLastNumber.push(lastNumber);
        }
    }
    if (secs > 0) {
        timeInSecs--;
    } else {
        clearInterval(ticker);
        // startTimer(timeOneGame); // 4 minutes in seconds
    }

    var mins = Math.floor(secs / 60);
    secs %= 60;
    var pretty =
        (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;

    let response = JSON.stringify([
        spinCode,
        pretty,
        random,
        historyLastNumber,
        xuThisGame,
        xuPreviousGame,
    ]);

    console.log('response', response);
    
    wsConnected.forEach((ws) =>
        ws.send(
            response
        )
    );
}

function initNewSpin() {
    wsConnected.forEach((ws) =>
        ws.send(
            JSON.stringify([
                spinCode,
                '02:00',
                random,
                historyLastNumber,
                xuThisGame,
                xuPreviousGame,
            ])
        )
    );
}
wss.on("connection", function (ws) {
    wsConnected.add(ws);
    ws.on("close", function () { });
});

function setSpinCode(num) {
    spinCode = num;
}

function stopSpin() {
    clearInterval(ticker);
}
global.startTimer = startTimer;
global.setSpinCode = setSpinCode;
global.initNewSpin = initNewSpin;
global.stopSpin = stopSpin;
import app from "./api.js";
