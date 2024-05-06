import Game from "../models/game.model.js";
import createError from "http-errors";

// import startTimer, { setStart, setSpinCode, setTimeInSecs } from '../ws.js';
import fs from "fs";


export default {
  create: async (req, res, next) => {
    console.log('create');
    const vxmm = req.body;
    const payload = req.payload;

    let game = {
      xu: parseInt(vxmm.xu),
      spin_code: vxmm.spin_code,
      bet: vxmm.bet.toUpperCase(),
      user_id : payload.userId
    };
    let newHistory = await Game.create(game);
    res.json({
      message: "create game game",
      data: newHistory,
      payload: req.payload,
    });

  },
};
