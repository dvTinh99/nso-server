import User from '../models/user.model.js'
import bcrypt from 'bcrypt';
import { singAccessToken } from '../services/jwt.service.js';
import createError from 'http-errors';

// async function register(email, password) {
//     let user = await User.findByEmail(email);
//     console.log('user', user);
    

//     if (user) {
//         return 'email already registered';
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     let newUser = {
//         email: email,
//         password: hashPassword
//     }

//     User.create(newUser);
//     return newUser;
// }

// async function login(email, password) {
//     const user = await User.findByEmail(email);

//     if (!user) {
//         return 'email not exist';
//     }

//     try {
//         let checkPassword = await bcrypt.compare(password, user.password);
//         if (!checkPassword) return 'password not match';

//         let accessToken = await singAccessToken(user.id);

//         res.json({
//             accessToken
//         });
//     } catch (e) {
//         return e;
//     }
// }
// export {
//     register,
//     login
// }

export default {
    register : async (req, res, next) => {
        try {
            let email = req.body.email;
            let password = req.body.password;

            let user = await User.findByEmail(email);

            if (user.length > 0) {
                throw createError.Conflict('Email has already been registered');
            }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            let newUser = {
                email: email,
                name: "tinh",
                password: hashPassword
            }

            User.create(newUser);
            res.json({'user' : newUser});
        } catch (error) {
            next(error)
        }   
        
    },

    login: async (req, res, next) => {
        try {
            
            let email = req.body.email;
            let password = req.body.password;
    
            let user = await User.findByEmail(email);

            
            if (user.length < 0) {
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
    }
}