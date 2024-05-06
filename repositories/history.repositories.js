import History from '../models/history.model.js';
export default {
    getAll : async (req, res, next) => {
        try {
            let histories = await History.histories();
            res.json({'histories' : histories});
        } catch (error) {
            next(error)
        }   
        
    },
    create : async (data) => {
        try {
            let newHistory = await History.create(data);
            console.log('newHistory', newHistory);
            
            if (newHistory.affectedRows == 1) {
                return true;
            } else {
                throw createError.BadRequest();
            }
        } catch (error) {
            return (error);
        }
    },
    shift : async (data) => {
        try {
            let oldest = await History.getOldest();
            let deleteOldest = await History.delete(oldest);
            if (deleteOldest.affectedRows == 1) {
                return true;
            } else {
                throw createError.BadRequest();
            }
        } catch (error) {
            return (error);
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
    getResultHistory: async (limit, order = 'ASC') => {
        try {
            let oldest = await History.getResultHistory(limit, order);
            return oldest;
        } catch (error) {
            return (error);
        }
    },

}