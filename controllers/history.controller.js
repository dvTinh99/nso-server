import History from '../models/history.model.js';
import HistoryRepo from '../repositories/history.repositories.js';
import createError from 'http-errors';
export default {
    getAll : async (req, res, next) => {
        try {
            let histories = await History.histories();
            res.json({'histories' : histories});
        } catch (error) {
            next(error)
        }   
        
    },
    create : async (req, res, next) => {
        try {
            let newHistory = await HistoryRepo.shift();

            // let history = {
            //     xu : 85000,
            //     result : 2
            // }

            
            // if (newHistory) {
            //     res.json({'message' : "create success"});
            // } else {
            //     throw createError.BadRequest();
            // }
        } catch (error) {
            next(error);
        }
    },
    delete : async (req, res, next) => {
        try {
            var id = req.params['id']; 

            let newHistory = await History.update(id);
            
            if (newHistory.affectedRows == 1) {
                res.json({'message' : 'History deleted successfully'});
            } else {
                throw createError.BadRequest();
            }
        } catch (error) {
            next(error);
        }
    },
    update : async (req, res, next) => {
        try {
            var id = req.params['id']; 

            let name = req.body.name;
            let location = req.body.location;
            let status = req.body.status || 1;

            let history = {
                status: status,
                name: name,
                location : location
            }
            let updateBot = await History.update(history, id);
            
            if (updateBot.affectedRows == 1) {
                res.json({'message' : 'History update successfully'});
            } else {
                throw createError.BadRequest();
            }
        } catch (error) {
            next(error);
        }
    },

}