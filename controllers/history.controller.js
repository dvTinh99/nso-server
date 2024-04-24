import History from "../models/history.model.js";
import HistoryRepo from "../repositories/history.repositories.js";
import createError from "http-errors";

// import startTimer, { setStart, setSpinCode, setTimeInSecs } from '../ws.js';
import fs from "fs";

const wss = new WebSocketServer({
  port: process.env.WEBSOCKET_PORT || 8080,
});

const wsConnected = new Set();
var timeInSecs = 120;
var ticker;
var random = getRandomInt(1000000000);
var start = false;

var get13Record = await HistoryRepo.getResultHistory(13);
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
    if (start) {
      timeInSecs--;
    }
  } else {
    clearInterval(ticker);
    // startTimer(timeOneGame); // 4 minutes in seconds
  }

  var mins = Math.floor(secs / 60);
  secs %= 60;
  var pretty =
    (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;

  wsConnected.forEach((ws) =>
    ws.send(
      JSON.stringify([
        spinCode,
        pretty,
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

  ws.on("close", function () {});
});

export default {
  getAll: async (req, res, next) => {
    try {
      console.log("req", req.query.perPage);
      let page = req.query.page || 1;
      let perPage = req.query.perPage || 15;

      let histories = await History.histories(perPage, (page - 1) * perPage);
      let total = await History.count();
      res.json({
        histories: histories,
        total: total,
        page: page,
        perPage: perPage,
      });
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const vxmm = req.body;
      console.log("create vxmm", vxmm);

      let history = {
        xu: parseInt(vxmm.xuThisGame.replace(/,/g, ""), 10),
        spin_code: vxmm.spinId,
        status: 0,
      };
      let checkExit = await History.findBySpinCode(vxmm.spinId);
      if (checkExit.length <= 0) {
        let newHistory = await History.create(history);
      }

      spinCode = vxmm.spinId;
      startTimer(120);

      if (newHistory.affectedRows == 1) {
        res.json({
          message: "create history game",
          data: req.body,
          payload: req.payload,
        });
      } else {
        throw createError.BadRequest();
      }
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      var id = req.params["id"];

      let newHistory = await History.update(id);

      if (newHistory.affectedRows == 1) {
        res.json({ message: "History deleted successfully" });
      } else {
        throw createError.BadRequest();
      }
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      var id = req.params["id"];

      let name = req.body.name;
      let location = req.body.location;
      let status = req.body.status || 1;

      let history = {
        status: status,
        name: name,
        location: location,
      };
      let updateBot = await History.update(history, id);

      if (updateBot.affectedRows == 1) {
        res.json({ message: "History update successfully" });
      } else {
        throw createError.BadRequest();
      }
    } catch (error) {
      next(error);
    }
  },
  start: async (req, res, next) => {
    try {
      console.log("start");
      const vxmm = req.body;
      let history = {
        spin_code: vxmm.spinId,
      };

      let checkExit = await History.findBySpinCode(vxmm.spinId);
      console.log("checkExit", checkExit.length);
      if (checkExit.length <= 0) {
        let rs = await History.create(history);
      }
      console.log("start timer", vxmm.time);
      spinCode = vxmm.spinId;
      setStart(true);
      let [minus, second] = vxmm.time.split(":");
      timeInSecs = (parseInt(minus) * 60 + parseInt(second));
      res.json({
        message: "call start history game",
        data: req.body,
        payload: req.payload,
      });
    } catch (error) {
      next(error);
    }
  },
  end: async (req, res, next) => {
    try {
      const vxmm = req.body;
      let history = {
        rate: vxmm.rate,
        xu: parseInt(vxmm.xu.replace(/,/g, ""), 10),
        number_people: vxmm.people,
        status: 1,
      };
      console.log("end", history);
      let updateBot = await History.updateBySpinCode(history, vxmm.spinId);
      setStart(false);
      if (updateBot.affectedRows == 1) {
        res.json({
          message: "call end history game",
          data: req.body,
          payload: req.payload,
        });
      } else {
        throw createError.BadRequest();
      }
    } catch (error) {
      next(error);
    }
  },
};
