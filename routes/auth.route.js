import express from 'express';
import { verifyToken } from '../services/jwt.service.js';
import AuthController from '../controllers/auth.controller.js'
const authRoute = express.Router();

authRoute.post('/register', AuthController.register);
authRoute.post('/login', AuthController.login);
authRoute.get('/info', verifyToken, AuthController.info);
authRoute.post('/cong-xu', verifyToken, AuthController.addXu);

export default authRoute;