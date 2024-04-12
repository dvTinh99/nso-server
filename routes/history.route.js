import express from 'express';
import HistoryController from '../controllers/history.controller.js'
const historyRoute = express.Router();

historyRoute.post('/create', HistoryController.create);

historyRoute.get('/all', HistoryController.getAll);

historyRoute.delete('/delete/:id', HistoryController.delete);
historyRoute.put('/update/:id', HistoryController.update);
export default historyRoute;;