import express from 'express';
import env from 'dotenv';
env.config();

import { createClient } from 'redis';

const client = createClient();
await client.connect();
await client.set('tinhdoan', '123456');

import { getAll } from './controllers/user.controller.js'
  
const app = express();

app.get('/', async (req, res) => {  
    res.send(await getAll()) 
});

app.listen(process.env.EXPRESS_PORT || 3001, function () {
    console.log('running');
    
});
export default app;