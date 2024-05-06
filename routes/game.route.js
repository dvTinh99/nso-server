import express from 'express';
import GameController from '../controllers/game.controller.js'
import { verifyToken } from '../services/jwt.service.js';
const gameRoute = express.Router();

gameRoute.post('/create', verifyToken, GameController.create);
export default gameRoute;