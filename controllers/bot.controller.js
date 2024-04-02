import Bot from '../models/bot.model.js';
import { singAccessToken } from '../services/jwt.service.js';
import createError from 'http-errors';
export default {
    getAll : async (req, res, next) => {
        try {
            let bots = await Bot.bots();
            res.json({'bots' : bots});
        } catch (error) {
            next(error)
        }   
        
    },

}