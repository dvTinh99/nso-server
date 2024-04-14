import User from '../models/user.model.js'
import bcrypt from 'bcrypt';
import { singAccessToken } from '../services/jwt.service.js';
import createError from 'http-errors';

export default {
    register : async (req, res, next) => {
        try {
            let email = req.body.email;
            let password = req.body.password;
            delete req.body.password;

            let user = await User.findByEmail(email);

            if (user.length > 0) {
                throw createError.Conflict('Email has already been registered');
            }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            let newUser = { 
                password : hashPassword,
                ...req.body
            }

            console.log('newUser', newUser);
            

            User.create(newUser);
            res.json({'user' : newUser});
        } catch (error) {
            next(error)
        }   
        
    },

    login: async (req, res, next) => {
        try {
            
            let username = req.body.username;
            let password = req.body.password;

            let user = await User.findByUsername(username);

            if (user.length <= 0) {
                throw createError.NotFound('user not found');
            }
            user = user[0];

            let checkPassword = await bcrypt.compare(password, user.password);
            
            if (!checkPassword) throw createError.Unauthorized();

            let accessToken = await singAccessToken(user.id);

            res.json({
                accessToken
            });
        } catch (error) {
            next(error)
        }
    },

    info: async (req, res, next) => {
        let id = req.payload.userId;
        let user = await User.find(id);
        let rs = user[0];
        res.json({
            user : rs
        });
    }
}