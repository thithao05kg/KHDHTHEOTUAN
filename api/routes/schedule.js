import express from 'express';
import * as scheduleController from '../controllers/scheduleController.js';

const router = express.Router();

router.get('/get-list-data', scheduleController.getListData);
router.post('/load-week', scheduleController.loadWeek);
router.post('/save', scheduleController.saveSchedule);

export default router;
