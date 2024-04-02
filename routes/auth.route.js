import express from 'express';
import { verifyToken } from '../services/jwt.service.js';
import AuthController from '../controllers/auth.controller.js'
const authRoute = express.Router();

app.post('/register', AuthController.register);
app.post('/login', AuthController.login);
export default authRoute;