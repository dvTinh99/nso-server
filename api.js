import express from 'express';
import env from 'dotenv';
env.config();

import createError from 'http-errors';
import { verifyToken } from './services/jwt.service.js';
import { createClient } from 'redis';
import { getAll } from './controllers/user.controller.js'
import AuthController from './controllers/auth.controller.js'
import botRoute from './routes/bot.route.js';
import authRoute from './routes/auth.route.js';
import historyRoute from './routes/history.route.js';
import cors from 'cors';


// const client = createClient();
// await client.connect();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/bot', botRoute);
app.use('/auth', authRoute);
app.use('/history', historyRoute);

app.get('/', async (req, res) => {  
    let users = await getAll();
    res.json(users) 
});


app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
});

const PORT = process.env.EXPRESS_PORT || 3001;
app.listen(PORT, function () {
    console.log(`running ${PORT}`);
    
});
export default app;