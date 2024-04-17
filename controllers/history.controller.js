import History from '../models/history.model.js';
import HistoryRepo from '../repositories/history.repositories.js';
import createError from 'http-errors';

import startTimer from '../ws.js';
import fs from 'fs';
export default {
    getAll : async (req, res, next) => {
        try {
            console.log('req', req.query.perPage);
            let page = req.query.page || 1;
            let perPage = req.query.perPage || 15;
            
            let histories = await History.histories(perPage, (page - 1) * perPage);
            let total = await History.count();
            res.json({
                'histories' : histories,
                'total': total,
                'page' : page,
                'perPage' : perPage,
            });
        } catch (error) {
            next(error)
        }   
        
    },
    create : async (req, res, next) => {
        try {
            const vxmm = req.body;
            let history = {
                xu: vxmm.xuThisGame, 
                spin_code : vxmm.spinId,
                status : 0
            }
            await HistoryRepo.create(history);
            res.json({
                'message' : 'create history game',
                "data" : req.body,
                "payload": req.payload 

            });
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
    start : async (req, res, next) => {
        try {
            const vxmm = req.body;
            let history = {
                spin_code: vxmm.spinId, 
                time : vxmm.time
            }

            [minute, second] = vxmm.time.split(':');
            startTimer(parseInt(minute) * 60 + parent(second));
            res.json({
                'message' : 'call start history game',
                "data" : req.body,
                "payload": req.payload 

            });
        } catch (error) {
            next(error);
        }
    },
    end : async (req, res, next) => {
        try {
            const vxmm = req.body;
            let history = {
                "rate" : vxmm.rate,
                "xu" : vxmm.xu,
                "people" : vxmm.people,
                "status" : 1
            }
            await HistoryRepo.update(history, vxmm.spinId);
            res.json({
                'message' : 'call end history game',
                "data" : req.body,
                "payload" : req.payload 

            });
        } catch (error) {
            throw createError.BadRequest();
        }
    },

}