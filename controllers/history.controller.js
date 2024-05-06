import History from "../models/history.model.js";
import HistoryRepo from "../repositories/history.repositories.js";
import createError from "http-errors";

// import startTimer, { setStart, setSpinCode, setTimeInSecs } from '../ws.js';
import fs from "fs";


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
    console.log('create');
    const vxmm = req.body;
    
    let history = {
      xu: parseInt(vxmm.xu.replace(/,/g, ""), 10),
      spin_code: vxmm.spinId,
      status: 0,
    };
    let checkExit = await History.findBySpinCode(vxmm.spinId);
    if (checkExit.length <= 0) {
      let newHistory = await History.create(history);
    }

    setSpinCode(vxmm.spinId);
    initNewSpin();

    res.json({
      message: "create history game",
      data: req.body,
      payload: req.payload,
    });

    // try {
    //   console.log("create vxmm", vxmm);

    //   let history = {
    //     xu: parseInt(vxmm.xuThisGame.replace(/,/g, ""), 10),
    //     spin_code: vxmm.spinId,
    //     status: 0,
    //   };
    //   let checkExit = await History.findBySpinCode(vxmm.spinId);
    //   if (checkExit.length <= 0) {
    //     let newHistory = await History.create(history);
    //   }

    //   spinCode = vxmm.spinId;
    //   startTimer(120);

    //   if (newHistory.affectedRows == 1) {
    //     res.json({
    //       message: "create history game",
    //       data: req.body,
    //       payload: req.payload,
    //     });
    //   } else {
    //     throw createError.BadRequest();
    //   }
    // } catch (error) {
    //   next(error);
    // }
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
    console.log('start');
    const vxmm = req.body;

    let checkExit = await History.findBySpinCode(vxmm.spinId);
    if (checkExit.length <= 0) {
      let history = {
        spin_code: vxmm.spinId,
      };
      await History.create(history);
    }

    let [minus, second] = vxmm.time.split(":");
    let timeInSecs = (parseInt(minus) * 60 + parseInt(second));

    setSpinCode(vxmm.spinId);
    startTimer(timeInSecs);

    res.json({
      message: "call start history game",
      data: req.body,
      payload: req.payload,
    });
    // try {
    //   console.log("start");
    //   const vxmm = req.body;
    //   let history = {
    //     spin_code: vxmm.spinId,
    //   };

    //   let checkExit = await History.findBySpinCode(vxmm.spinId);
    //   console.log("checkExit", checkExit.length);
    //   if (checkExit.length <= 0) {
    //     let rs = await History.create(history);
    //   }
    //   console.log("start timer", vxmm.time);
    //   spinCode = vxmm.spinId;
    //   setStart(true);
    //   let [minus, second] = vxmm.time.split(":");
    //   timeInSecs = (parseInt(minus) * 60 + parseInt(second));
    //   res.json({
    //     message: "call start history game",
    //     data: req.body,
    //     payload: req.payload,
    //   });
    // } catch (error) {
    //   next(error);
    // }
  },
  end: async (req, res, next) => {
    console.log('end');
    stopSpin();
    const vxmm = req.body;
    let history = {
      rate: vxmm.rate,
      xu: parseInt(vxmm.xu.replace(/,/g, ""), 10),
      number_people: vxmm.people,
      result : vxmm.result,
      status: 1,
    };
    let updateBot = await History.updateBySpinCode(history, vxmm.spinId);
    res.json({
      message: "call end history game",
      data: req.body,
      payload: req.payload,
    });
    // try {
    //   const vxmm = req.body;
    //   let history = {
    //     rate: vxmm.rate,
    //     xu: parseInt(vxmm.xu.replace(/,/g, ""), 10),
    //     number_people: vxmm.people,
    //     status: 1,
    //   };
    //   console.log("end", history);
    //   let updateBot = await History.updateBySpinCode(history, vxmm.spinId);
    //   setStart(false);
    //   if (updateBot.affectedRows == 1) {
    //     res.json({
    //       message: "call end history game",
    //       data: req.body,
    //       payload: req.payload,
    //     });
    //   } else {
    //     throw createError.BadRequest();
    //   }
    // } catch (error) {
    //   next(error);
    // }
  },
};
