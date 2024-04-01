import express from 'express';
import env from 'dotenv';
env.config();

import { getAll } from './controllers/user.controller.js'
  
const app = express();

app.get('/', async (req, res) => {  
    res.send(await getAll()) 
});

app.listen(process.env.EXPRESS_PORT || 3001, function () {
    console.log('running');
    
});
export default app;