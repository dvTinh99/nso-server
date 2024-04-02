import express from 'express';
import { verifyToken } from '../services/jwt.service.js';
import BotController from '../controllers/bot.controller.js'
const botRoute = express.Router();

// botRoute.get('/create', verifyToken, async (req, res) => {  
//     let users = await BotController.getAll();
//     res.json(users) 
// });

botRoute.get('/all', verifyToken, BotController.getAll);

export default botRoute;