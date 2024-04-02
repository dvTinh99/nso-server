import express from 'express';
import env from 'dotenv';
env.config();

import { createClient } from 'redis';

const client = createClient();
await client.connect();

import { getAll } from './controllers/user.controller.js'
import AuthController from './controllers/auth.controller.js'

import { verifyToken } from './services/jwt.service.js';
import createError from 'http-errors';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.get('/', verifyToken, async (req, res) => {  
    let users = await getAll();
    res.json(users) 
});

app.post('/register', AuthController.register);
app.post('/login', AuthController.login);

app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
});

app.listen(process.env.EXPRESS_PORT || 3001, function () {
    console.log('running');
    
});
export default app;