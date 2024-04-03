import express from 'express';
import { verifyToken } from '../services/jwt.service.js';
import BotController from '../controllers/bot.controller.js'
const botRoute = express.Router();

botRoute.post('/create', verifyToken, BotController.create);

botRoute.get('/all', verifyToken, BotController.getAll);

botRoute.delete('/delete/:id', verifyToken, BotController.delete);
botRoute.put('/update/:id', verifyToken, BotController.update);
export default botRoute;;